#!/usr/bin/env python3
"""Build the English and Spanish static pages from the Portuguese originals.

Translations live in locales/{en,es}.json, keyed by the original visible text.
Run after changing Portuguese copy, then fill new keys before publishing.
"""
import json
import re
from pathlib import Path
import xml.etree.ElementTree as ET

from bs4 import BeautifulSoup, Comment, Doctype, NavigableString

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html",
    "linkminer.html",
    "blog.html",
    "blog-artigo.html",
    "blog/whatsapp-business-api-cobranca-outubro-2026.html",
)
ATTRS = ("alt", "aria-label", "title", "placeholder", "data-label")
LOCALES = {"en": "en", "es": "es-419"}
URL_PATHS = {
    "index.html": "",
    "linkminer.html": "linkminer",
    "blog.html": "blog",
    "blog-artigo.html": "blog/artigo",
    "blog/whatsapp-business-api-cobranca-outubro-2026.html": "blog/whatsapp-business-api-cobranca-outubro-2026",
}


def source_texts():
    values = set()
    for page in PAGES:
        soup = BeautifulSoup((ROOT / page).read_text(), "html5lib")
        for node in soup.find_all(string=True):
            if isinstance(node, (Comment, Doctype)) or node.parent.name in ("script", "style") or node.parent.find_parent(class_="locale-switch"):
                continue
            value = node.strip()
            if value and any(c.isalpha() for c in value):
                values.add(value)
        for tag in soup.find_all(True):
            if tag.get("class") and "locale-switch" in tag.get("class") or tag.find_parent(class_="locale-switch"):
                continue
            for attr in ATTRS:
                value = tag.get(attr)
                if isinstance(value, str) and value.strip() and any(c.isalpha() for c in value):
                    values.add(value.strip())
            if tag.name == "meta" and tag.get("name") == "description":
                values.add(tag.get("content", "").strip())
            if tag.name == "meta" and tag.get("property", "").startswith("og:") and tag.get("property") in ("og:title", "og:description", "og:image:alt"):
                values.add(tag.get("content", "").strip())
            if tag.name == "meta" and tag.get("name") in ("twitter:title", "twitter:description", "twitter:image:alt"):
                values.add(tag.get("content", "").strip())
    return sorted(values)


def localized_path(page, locale):
    suffix = URL_PATHS[page]
    return "/" + locale + ("/" + suffix if suffix else "/")


def language_switch(page, locale):
    fragment = BeautifulSoup('<details class="locale-switch"></details>', "html5lib")
    switch = fragment.details
    summary = fragment.new_tag("summary")
    summary["aria-label"] = {"pt": "Selecionar idioma", "en": "Choose language", "es": "Elegir idioma"}[locale]
    current_flag = fragment.new_tag("img", src="/assets/flags/" + {"pt": "br", "en": "us", "es": "es"}[locale] + ".svg", alt="", width="22", height="16")
    summary.append(current_flag)
    switch.append(summary)
    menu = fragment.new_tag("div", attrs={"class": "locale-switch__menu"})
    for code in ("pt", "en", "es"):
        anchor = fragment.new_tag("a", href=("/" + URL_PATHS[page] if URL_PATHS[page] else "/") if code == "pt" else localized_path(page, code))
        anchor["lang"] = {"pt": "pt-BR", "en": "en", "es": "es-419"}[code]
        anchor.append(fragment.new_tag("img", src="/assets/flags/" + {"pt": "br", "en": "us", "es": "es"}[code] + ".svg", alt="", width="22", height="16"))
        anchor.append({"pt": "Português (Brasil)", "en": "English (US)", "es": "Español"}[code])
        if code == locale:
            anchor["aria-current"] = "page"
        menu.append(anchor)
    switch.append(menu)
    return switch


def add_switches(soup, page, locale):
    if page == "index.html":
        soup.select_one(".nav-main").insert_after(language_switch(page, locale))
    elif page == "linkminer.html":
        soup.select_one(".nav-main").insert_after(language_switch(page, locale))
    else:
        soup.select_one(".blog-header__main").insert_after(language_switch(page, locale))


def set_seo(soup, page, locale, translations):
    head = soup.head
    canonical = "https://crminer.com.br" + (localized_path(page, locale) if locale != "pt" else ("/" + URL_PATHS[page] if URL_PATHS[page] else "/"))
    if page == "blog-artigo.html":
        # The generic article template is noindex until it resolves a slug.
        canonical = "https://crminer.com.br" + localized_path("blog.html", locale) if locale != "pt" else "https://crminer.com.br/blog"
    existing = head.find("link", rel="canonical")
    if existing:
        existing["href"] = canonical
    for tag in head.find_all("meta"):
        if tag.get("property") == "og:locale":
            tag["content"] = {"pt": "pt_BR", "en": "en_US", "es": "es_419"}[locale]
        if tag.get("property") == "og:url":
            tag["content"] = canonical
    for old in head.find_all("link", rel="alternate"):
        old.decompose()
    for code in ("pt", "en", "es"):
        href = "https://crminer.com.br" + (("/" + URL_PATHS[page] if URL_PATHS[page] else "/") if code == "pt" else localized_path(page, code))
        alt = soup.new_tag("link", rel="alternate", hreflang={"pt": "pt-BR", "en": "en", "es": "es-419"}[code], href=href)
        head.append(alt)
    head.append(soup.new_tag("link", rel="alternate", hreflang="x-default", href="https://crminer.com.br" + ("/" + URL_PATHS[page] if URL_PATHS[page] else "/")))
    for script in head.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string)
        except (TypeError, json.JSONDecodeError):
            continue
        def update(obj):
            if isinstance(obj, dict):
                if "inLanguage" in obj:
                    obj["inLanguage"] = {"pt": "pt-BR", "en": "en", "es": "es-419"}[locale]
                if obj.get("@type") in ("WebSite", "SoftwareApplication", "BlogPosting"):
                    if "url" in obj: obj["url"] = canonical
                    if "mainEntityOfPage" in obj: obj["mainEntityOfPage"] = canonical
                if obj.get("@type") == "BlogPosting":
                    obj["headline"] = translations.get(obj.get("headline", ""), obj.get("headline", ""))
                    obj["description"] = translations.get(obj.get("description", ""), obj.get("description", ""))
                    obj["image"] = "https://crminer.com.br/assets/contents/whatsapp-api-cover-" + locale + ".png"
                for item in obj.values(): update(item)
            elif isinstance(obj, list):
                for item in obj: update(item)
        update(data)
        script.string = json.dumps(data, ensure_ascii=False)


def translate_page(page, locale, translations):
    soup = BeautifulSoup((ROOT / page).read_text(), "html5lib")
    soup.html["lang"] = LOCALES[locale]
    for existing_switch in soup.select(".locale-switch"):
        existing_switch.decompose()
    for node in list(soup.find_all(string=True)):
        if isinstance(node, (Comment, Doctype)) or node.parent.name in ("script", "style") or node.parent.find_parent(class_="locale-switch"):
            continue
        value = node.strip()
        if value in translations:
            leading = node[:len(node) - len(node.lstrip())]
            trailing = node[len(node.rstrip()):]
            node.replace_with(NavigableString(leading + translations[value] + trailing))
    for tag in soup.find_all(True):
        if tag.get("class") and "locale-switch" in tag.get("class") or tag.find_parent(class_="locale-switch"):
            continue
        for attr in ATTRS:
            value = tag.get(attr)
            if isinstance(value, str) and value.strip() in translations:
                tag[attr] = translations[value.strip()]
        if tag.name == "meta" and (tag.get("name") in ("description", "twitter:title", "twitter:description", "twitter:image:alt") or tag.get("property") in ("og:title", "og:description", "og:image:alt")):
            tag["content"] = translations.get(tag.get("content", ""), tag.get("content", ""))
        for attr in ("src", "href"):
            value = tag.get(attr)
            if isinstance(value, str) and value and not value.startswith(("/", "#", "http:", "https:", "data:", "mailto:")):
                tag[attr] = "/" + value
        if tag.name == "a":
            href = tag.get("href", "")
            for pt, suffix in (("/index.html", ""), ("/", ""), ("/linkminer.html", "linkminer"), ("/linkminer", "linkminer"), ("/blog.html", "blog"), ("/blog", "blog")):
                if href == pt:
                    tag["href"] = "/" + locale + ("/" + suffix if suffix else "/")
                    break
            if href.startswith("/blog/whatsapp-business-api-cobranca-outubro-2026"):
                tag["href"] = "/" + locale + href
            if href.startswith("/blog/artigo"):
                tag["href"] = "/" + locale + href
    add_switches(soup, page, locale)
    set_seo(soup, page, locale, translations)
    if page == "blog/whatsapp-business-api-cobranca-outubro-2026.html":
        cover = "/assets/contents/whatsapp-api-cover-" + locale + ".png"
        image = soup.select_one(".article-cover")
        image["src"] = cover
        image["width"] = "1674" if locale == "en" else "1672"
        image["height"] = "940" if locale == "en" else "941"
        for meta in soup.find_all("meta"):
            if meta.get("property") == "og:image" or meta.get("name") == "twitter:image":
                meta["content"] = "https://crminer.com.br" + cover
    # Keep Brazilian legal pages in Portuguese, visibly identified as such.
    for anchor in soup.select('a[href="/termos"],a[href="/privacidade"],a[href="/anexo-de-dados"],a[href="/exclusao-de-dados"]'):
        anchor.append(NavigableString(" (Portuguese)" if locale == "en" else " (en portugués)"))
    out = ROOT / locale / page
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(str(soup), encoding="utf-8")


def build_sitemap():
    ns = "http://www.sitemaps.org/schemas/sitemap/0.9"
    xhtml = "http://www.w3.org/1999/xhtml"
    ET.register_namespace("", ns)
    ET.register_namespace("xhtml", xhtml)
    root = ET.Element("{" + ns + "}urlset")
    for page in ("index.html", "linkminer.html", "blog.html", "blog/whatsapp-business-api-cobranca-outubro-2026.html"):
        urls = {"pt-BR": "https://crminer.com.br" + ("/" + URL_PATHS[page] if URL_PATHS[page] else "/")}
        urls.update({code if code == "en" else "es-419": "https://crminer.com.br" + localized_path(page, code) for code in ("en", "es")})
        for current in urls.values():
            entry = ET.SubElement(root, "{" + ns + "}url")
            ET.SubElement(entry, "{" + ns + "}loc").text = current
            for lang, href in (*urls.items(), ("x-default", urls["pt-BR"])):
                ET.SubElement(entry, "{" + xhtml + "}link", {"rel": "alternate", "hreflang": lang, "href": href})
    for path in ("termos", "privacidade", "anexo-de-dados", "exclusao-de-dados"):
        entry = ET.SubElement(root, "{" + ns + "}url")
        ET.SubElement(entry, "{" + ns + "}loc").text = "https://crminer.com.br/" + path
    ET.indent(root, space="  ")
    (ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(root, encoding="unicode") + "\n")


def main():
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--extract":
        print(json.dumps(source_texts(), ensure_ascii=False, indent=2))
        return
    for locale in LOCALES:
        mapping = json.loads((ROOT / "locales" / (locale + ".json")).read_text())
        overrides = json.loads((ROOT / "locales/overrides.json").read_text())[locale]
        mapping.update(overrides)
        if locale == "es":
            mapping = {key: re.sub(r"\bEnlace Minero\b", "LinkMiner", re.sub(r"\bminero\b", "crminer", value)) for key, value in mapping.items()}
        missing = [item for item in source_texts() if item not in mapping]
        if missing:
            raise SystemExit(f"{locale}: {len(missing)} missing translations; run --extract")
        for page in PAGES:
            translate_page(page, locale, mapping)
    build_sitemap()


if __name__ == "__main__":
    main()
