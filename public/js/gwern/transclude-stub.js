/**
 * transclude-stub.js
 *
 * Warum existiert diese Datei?
 * ----------------------------
 * Die Gwern-JavaScript-Bibliotheken (extracts.js, annotations.js, content.js etc.)
 * setzen eine Reihe von Backend-Funktionen und Framework-Objekten voraus, die im
 * Original-Gwern-Stack vorhanden sind, aber in unserem Signal-VisionFusen-Projekt
 * nicht geladen werden. Diese Datei stellt alle nötigen Stubs bereit, damit das
 * Gwern-Frontend ohne Fehler läuft — ohne die echte Backend-Logik zu benötigen.
 *
 * Stubs werden nur gesetzt wenn das Symbol noch nicht definiert ist (guard: typeof === 'undefined').
 * Alle Funktionen sind absichtlich No-Ops oder geben leere/sichere Standardwerte zurück.
 */


/* ============================================================================
   SEKTION 1: Transclude API (window.Transclude)
   ============================================================================ */

window.Transclude = {
    fillTemplateNamed: function(templateName, data) {
        if (templateName === "pop-frame-title-standard") {
            var title = data.popFrameTitle || data.popFrameTitleText || "";
            var link = data.popFrameTitleLinkHref || "";
            var html = link
                ? '<a class="popframe-title-link" href="' + link + '">' + title + '</a>'
                : '<span class="popframe-title-text">' + title + '</span>';
            return elementFromHTML(html);
        }
        if (templateName === "annotation-blockquote-not" || templateName === "annotation-blockquote-inside") {
            var c = data.content || {};
            var parts = [];
            if (c.titleLinkHref) parts.push('<p><a class="' + (c.titleLinkClass || 'title-link') + '" href="' + c.titleLinkHref + '">' + (c.title || '') + '</a></p>');
            if (c.authorDateAux) parts.push('<p class="author-date-aux">' + c.authorDateAux + '</p>');
            if (c.abstract) parts.push('<blockquote>' + c.abstract + '</blockquote>');
            return elementFromHTML('<div class="annotation">' + parts.join('') + '</div>');
        }
        return elementFromHTML('<span></span>');
    },

    isIncludeLink: function(el) { return false; },

    allIncludeLinksInContainer: function(container) { return []; },

    triggerTranscludesInContainer: function(container, options) {
        if (!container) return;
        var links = container.querySelectorAll
            ? container.querySelectorAll('a.include-annotation, a.include-annotation-partial')
            : [];
        links.forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href) return;
            var refData = Annotations.cachedReferenceDataForLink
                ? Annotations.cachedReferenceDataForLink(link)
                : null;
            if (!refData || refData === 'LOADING_FAILED' || !refData.content) return;
            var c = refData.content;
            var parts = [];
            if (c.titleLinkHref) parts.push('<p><a class="' + (c.titleLinkClass || 'title-link') + '" href="' + c.titleLinkHref + '">' + (c.title || '') + '</a></p>');
            if (c.authorDateAux) parts.push('<p class="data-field author-date-aux">' + c.authorDateAux + '</p>');
            if (c.abstract) parts.push('<blockquote><p>' + c.abstract + '</p></blockquote>');
            var el = elementFromHTML('<div class="annotation">' + parts.join('') + '</div>');
            link.replaceWith(el);
            var popFrame = container.closest && container.closest('.popup, .popin');
            if (popFrame && Popups && Popups.clearPopFrameState) {
                Popups.clearPopFrameState(popFrame);
            }
        });
    },

    transclude: function(link, force) {}
};


/* ============================================================================
   SEKTION 2: GW Framework Extensions
   (GW.pageToolbar, GW.svg, GW.floatingHeader)
   ============================================================================ */

/* GW.pageToolbar — referenced by extracts-options.js */
if (typeof GW !== 'undefined') {
    GW.pageToolbar = {
        addWidget: function(html) {
            var el = document.createElement("div");
            if (html) el.innerHTML = html;
            return el;
        },
        removeWidget: function() {},
        updateState: function() {},
        toggleCollapseState: function() {},
        expandToolbarFlashWidgetDoThing: function() {},
        flashWidget: function() {},
        demoCollapseDelay: 0,
        widgetFlashFallDuration: 0,
        widgetFlashRiseDuration: 0
    };
}

/* GW.svg — referenced by extracts-options.js for toolbar icons */
if (typeof GW !== 'undefined' && !GW.svg) {
    GW.svg = function(iconName) {
        var icons = {
            'window-close':             '\u2715',
            'arrows-maximize-solid':    '\u2922',
            'compress-solid':           '\u2198',
            'thumbtack-regular':        '\u25cb',
            'thumbtack-solid':          '\u25cf',
            'gear-solid':               '\u2699',
            'window-minimize':          '\u2581',
            'window-maximize':          '\u25a1',
            'expand-arrows-up-left':    '\u2196',
            'expand-arrows-up':         '\u2191',
            'expand-arrows-up-right':   '\u2197',
            'expand-arrows-left':       '\u2190',
            'expand-arrows-right':      '\u2192',
            'expand-arrows-down-left':  '\u2199',
            'expand-arrows-down':       '\u2193',
            'expand-arrows-down-right': '\u2198',
            'eye-slash-solid':          '\u25ce',
            'eye-slash-regular':        '\u25ce'
        };
        return '<span class="svg-icon-placeholder">' + (icons[iconName] || '\u25a0') + '</span>';
    };
}

/* GW.floatingHeader — referenced by extracts-content.js */
if (typeof GW !== 'undefined' && !GW.floatingHeader) {
    GW.floatingHeader = {
        maxHeaderHeight: 0
    };
}


/* ============================================================================
   SEKTION 3: DOM Helpers
   (isAnchorLink, isNodeEmpty, previousBlockOf, stripDateRangeMetadataInBlock,
    GWServerLogError, processMainContentAndAddRewriteProcessor, addRewriteProcessor,
    addLayoutProcessor, synthesizeIncludeLink, startDynamicLayoutInContainer,
    endDynamicLayoutInContainer, registerCopyProcessorsForDocument,
    requestImageInversionJudgmentsForImagesInContainer,
    requestImageOutliningJudgmentsForImagesInContainer)
   ============================================================================ */

if (typeof window.isAnchorLink === 'undefined') {
    window.isAnchorLink = function(target) {
        if (!target || !target.hash) return false;
        return (target.pathname === location.pathname || target.pathname === '');
    };
}

if (typeof window.isNodeEmpty === 'undefined') {
    window.isNodeEmpty = function(n) { return !n || n.childNodes.length === 0; };
}

if (typeof window.previousBlockOf === 'undefined') {
    window.previousBlockOf = function() { return null; };
}

if (typeof window.stripDateRangeMetadataInBlock === 'undefined') {
    window.stripDateRangeMetadataInBlock = function() {};
}

if (typeof window.GWServerLogError === 'undefined') {
    window.GWServerLogError = function() {};
}

if (typeof window.processMainContentAndAddRewriteProcessor === 'undefined') {
    window.processMainContentAndAddRewriteProcessor = function(n, p) {
        var m = document.querySelector('.markdownBody') || document.querySelector('main');
        if (m) try { p(m); } catch (e) {}
    };
}

if (typeof window.addRewriteProcessor === 'undefined') {
    window.addRewriteProcessor = function() {};
}

if (typeof window.addLayoutProcessor === 'undefined') {
    window.addLayoutProcessor = function() {};
}

if (typeof window.synthesizeIncludeLink === 'undefined') {
    window.synthesizeIncludeLink = function(link, attributes, properties) {
        var el = newElement("A", attributes, properties);
        if (link == null) return el;
        if (typeof link === "string") {
            el.href = link;
        } else if (link instanceof HTMLAnchorElement) {
            el.href = link.getAttribute("href");
        } else if (link instanceof URL) {
            el.href = link.href;
        } else {
            return null;
        }
        if (link instanceof HTMLAnchorElement) {
            for (var key in link.dataset) el.dataset[key] = link.dataset[key];
        }
        el.classList.add("include");
        return el;
    };
}

if (typeof window.startDynamicLayoutInContainer === 'undefined') {
    window.startDynamicLayoutInContainer = function() {};
}

if (typeof window.endDynamicLayoutInContainer === 'undefined') {
    window.endDynamicLayoutInContainer = function() {};
}

if (typeof window.registerCopyProcessorsForDocument === 'undefined') {
    window.registerCopyProcessorsForDocument = function() {};
}

if (typeof window.requestImageInversionJudgmentsForImagesInContainer === 'undefined') {
    window.requestImageInversionJudgmentsForImagesInContainer = function() {};
}

if (typeof window.requestImageOutliningJudgmentsForImagesInContainer === 'undefined') {
    window.requestImageOutliningJudgmentsForImagesInContainer = function() {};
}

if (typeof window.pageThumbnailAttributesFromDocument === 'undefined') {
    window.pageThumbnailAttributesFromDocument = function() { return null; };
}

if (typeof window.stripAnchorsFromLink === 'undefined') {
    window.stripAnchorsFromLink = function(link) {
        if (!link) return '';
        if (typeof link === 'string') return link.split('#')[0];
        if (link.href) return link.href.split('#')[0];
        return '';
    };
}


/* ============================================================================
   SEKTION 4: Prototype Extensions
   (HTMLElement.addActivateEvent, HTMLElement.trimQuotes,
    String.camelCaseToKebabCase, DOMTokenList.containsAnyOf)
   ============================================================================ */

if (!HTMLElement.prototype.addActivateEvent) {
    HTMLElement.prototype.addActivateEvent = function(h) {
        this.addEventListener("click", h);
    };
}

if (!HTMLElement.prototype.trimQuotes) {
    HTMLElement.prototype.trimQuotes = function() { return this; };
}

if (!String.prototype.camelCaseToKebabCase) {
    String.prototype.camelCaseToKebabCase = function() {
        return this.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    };
}

if (!DOMTokenList.prototype.containsAnyOf) {
    DOMTokenList.prototype.containsAnyOf = function(cls) {
        for (var i = 0; i < cls.length; i++) {
            if (this.contains(cls[i])) return true;
        }
        return false;
    };
}


/* ============================================================================
   SEKTION 5: Media Stubs
   (Images, AuxLinks, Content.contentTypes)
   ============================================================================ */

/* Images — referenced by annotations.js and content.js */
if (typeof window.Images === 'undefined') {
    window.Images = {
        thumbnailURLForImage: function(img) { return img?.src || ''; },
        thumbnailifyImage: function() {},
        isSVG: function() { return false; }
    };
}

/* AuxLinks */
if (typeof window.AuxLinks === 'undefined') {
    window.AuxLinks = {
        auxLinksLinkType: function() { return null; },
        targetOfAuxLinksLink: function() { return null; }
    };
}

/* Content.contentTypes — nur stubben wenn Content geladen aber contentTypes fehlt */
if (typeof window.Content !== 'undefined' && !window.Content.contentTypes) {
    window.Content.contentTypes = {};
}


/* ============================================================================
   SEKTION 6: Deutsche UI-Anpassungen
   (Popup-Tooltips, Button-Titles)
   ============================================================================ */

document.addEventListener("DOMContentLoaded", function() {
    if (typeof Popups !== 'undefined' && Popups.titleBarComponents) {
        /* Deutsche Tooltip-Texte */
        Popups.titleBarComponents.standardTooltip  = "Popup an der Titelleiste ziehen zum Verschieben. Doppelklick zum Ein-/Ausklappen.";
        Popups.titleBarComponents.minimizedTooltip = "Klicken zum Wiederherstellen";

        /* Deutsche Button-Beschriftungen */
        var bt = Popups.titleBarComponents.buttonTitles;
        if (bt) {
            bt["close"]            = "Popup schliessen (Alt gedr\u00fcckt: alle schliessen)";
            bt["zoom"]             = "Popup maximieren";
            bt["restore"]          = "Popup auf Originalgr\u00f6sse zur\u00fccksetzen";
            bt["pin"]              = "Popup anpinnen (bleibt sichtbar)";
            bt["unpin"]            = "Popup l\u00f6sen";
            bt["minimize"]         = "Popup minimieren";
            bt["unminimize"]       = "Popup wiederherstellen";
            bt["zoom-top-left"]    = "Oben links platzieren";
            bt["zoom-top"]         = "Oben platzieren";
            bt["zoom-top-right"]   = "Oben rechts platzieren";
            bt["zoom-left"]        = "Links platzieren";
            bt["zoom-right"]       = "Rechts platzieren";
            bt["zoom-full"]        = "Vollbild";
            bt["zoom-bottom-left"] = "Unten links platzieren";
            bt["zoom-bottom"]      = "Unten platzieren";
            bt["zoom-bottom-right"]= "Unten rechts platzieren";
        }

        /* Vollbild-Option aus popupPlaces entfernen */
        if (Array.isArray(Popups.titleBarComponents.popupPlaces)) {
            Popups.titleBarComponents.popupPlaces =
                Popups.titleBarComponents.popupPlaces.filter(function(p) { return p !== 'full'; });
        }
    }

    /* Disable-Button aus der Popup-Titelleiste ausblenden */
    if (typeof Extracts !== 'undefined') {
        Extracts.disableExtractPopFramesPopFrameTitleBarButton = function() {
            return newElement("SPAN", { style: "display:none" });
        };
    }
});
