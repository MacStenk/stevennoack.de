/**
 * popup-styles.js — Injiziert Styles in Gwern Popup Shadow DOMs
 * Muss NACH gwern-bundle laufen.
 * Beobachtet neue Popups via MutationObserver.
 */
(function() {
  'use strict';

  var POPUP_CSS = [
    '.shadow-body { padding: 1rem 1.25rem !important; font-family: system-ui, -apple-system, sans-serif !important; font-size: 0.9375rem !important; line-height: 1.6 !important; color: #e5e5e5 !important; }',
    '.shadow-body .title-link, .shadow-body p:first-child a { font-weight: 600 !important; font-size: 1.05rem !important; line-height: 1.3 !important; display: block !important; margin-bottom: 0.75rem !important; text-decoration: none !important; }',
    '.shadow-body .data-field.author-date-aux { font-size: 0.8125rem !important; color: #999 !important; margin-bottom: 0.75rem !important; display: block !important; }',
    '.shadow-body .author { font-size: 0.8125rem !important; color: #999 !important; }',
    '.shadow-body .link-tags { font-size: 0.75rem !important; color: #999 !important; }',
    '.shadow-body .link-tags a { text-decoration: none !important; }',
    '.shadow-body blockquote { margin: 0 !important; padding: 0.75rem 0 0 0 !important; border-left: none !important; border-top: 1px solid #333 !important; font-size: 0.875rem !important; line-height: 1.65 !important; }',
    '.shadow-body blockquote p { margin: 0 !important; }',
    '.shadow-body .annotation { display: flex !important; flex-direction: column !important; gap: 0 !important; }',
    '.shadow-body .annotation > p:first-child { margin-bottom: 0.75rem !important; }',
    '.shadow-body .annotation > .data-field:not(:last-child) { margin-bottom: 0 !important; }',
  ].join('\n');

  function injectStyles(shadowRoot) {
    if (!shadowRoot || shadowRoot.querySelector('[data-popup-custom-styles]')) return;
    var style = document.createElement('style');
    style.setAttribute('data-popup-custom-styles', 'true');
    style.textContent = POPUP_CSS;
    shadowRoot.appendChild(style);
  }

  // Watch for new popups
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        if (node.classList && node.classList.contains('popup')) {
          var cv = node.querySelector('.popframe-content-view');
          if (cv && cv.shadowRoot) {
            injectStyles(cv.shadowRoot);
          }
          // Also watch for shadow root creation
          var mo2 = new MutationObserver(function() {
            var cv2 = node.querySelector('.popframe-content-view');
            if (cv2 && cv2.shadowRoot) {
              injectStyles(cv2.shadowRoot);
              mo2.disconnect();
            }
          });
          mo2.observe(node, { childList: true, subtree: true });
        }
      });
    });
  });

  var container = document.getElementById('popup-container');
  if (container) {
    observer.observe(container, { childList: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      var c = document.getElementById('popup-container');
      if (c) observer.observe(c, { childList: true });
    });
  }

  // Local-page section transclude: fill popup body for a.include-strict links.
  // The Gwern bundle's Transclude stub only handles annotation includes.
  // This handler fills local page section popups from cached content.
  function fillLocalPagePopup(popup) {
    if (!popup || !popup.classList.contains('local-page')) return;
    if (!popup.classList.contains('loading')) return;

    var shadowRoot = popup.querySelector('.popframe-content-view') &&
                     popup.querySelector('.popframe-content-view').shadowRoot;
    if (!shadowRoot) return;

    var body = shadowRoot.querySelector('.shadow-body');
    if (!body) return;

    var includeLink = body.querySelector('a.include');
    if (!includeLink) return;

    var href = includeLink.getAttribute('href');
    if (!href) return;

    // Anchor link to section in current page or fetched page
    var spawningTarget = popup.spawningTarget;
    if (!spawningTarget) return;

    var fullHref = spawningTarget.href || '';
    var hashPart = spawningTarget.hash || '';

    // Try to get content from Content cache
    var refData = null;
    try {
      refData = Content && Content.referenceDataForLink && Content.referenceDataForLink(spawningTarget);
    } catch (e) {}

    if (!refData || refData === 'LOADING_FAILED') {
      // Try to load
      try {
        Content && Content.load && Content.load(spawningTarget, function() {
          fillLocalPagePopup(popup);
        });
      } catch (e) {}
      return;
    }

    var contentDoc = refData.content;
    if (!contentDoc) return;

    var sectionEl = null;

    // Find section by hash in cached content
    if (hashPart && hashPart.length > 1) {
      var anchorId = hashPart.slice(1);
      try { anchorId = decodeURIComponent(anchorId); } catch (e) {}
      try {
        sectionEl = contentDoc.querySelector('[id="' + anchorId + '"]');
      } catch (e) {}
    }

    // Build popup content
    var contentHTML = '';

    if (sectionEl) {
      // Get heading text and next sibling paragraphs
      var heading = sectionEl;
      var headingText = heading.textContent || '';
      var fragment = document.createDocumentFragment();
      var headingClone = heading.cloneNode(true);
      fragment.appendChild(headingClone);
      var sibling = heading.nextElementSibling;
      var count = 0;
      while (sibling && count < 8) {
        var tagName = sibling.tagName.toUpperCase();
        if (/^H[1-6]$/.test(tagName)) break;
        fragment.appendChild(sibling.cloneNode(true));
        sibling = sibling.nextElementSibling;
        count++;
      }
      var wrapper = document.createElement('div');
      wrapper.appendChild(fragment);
      contentHTML = wrapper.innerHTML;
    } else {
      // No hash: show page title and intro
      var pageTitle = refData.pageTitle || '';
      var firstP = contentDoc.querySelector('p');
      contentHTML = '<h3>' + pageTitle + '</h3>' + (firstP ? firstP.outerHTML : '');
    }

    if (!contentHTML) return;

    // Replace include link with content
    var wrapper = document.createElement('div');
    wrapper.innerHTML = contentHTML;
    includeLink.replaceWith(wrapper);

    // Clear loading state
    if (typeof Popups !== 'undefined' && Popups.clearPopFrameState) {
      try { Popups.clearPopFrameState(popup); } catch (e) {}
    } else {
      popup.classList.remove('loading', 'loading-failed');
      body.classList.remove('loading', 'loading-failed');
    }
  }

  // Hook into Popups.popupDidSpawn event
  if (typeof GW !== 'undefined' && GW.notificationCenter) {
    GW.notificationCenter.addHandlerForEvent('Popups.popupDidSpawn', function(info) {
      var popup = info && info.popup;
      if (popup) {
        // Delay to allow Gwern's own loading attempt first
        setTimeout(function() {
          fillLocalPagePopup(popup);
        }, 300);
      }
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof GW !== 'undefined' && GW.notificationCenter) {
        GW.notificationCenter.addHandlerForEvent('Popups.popupDidSpawn', function(info) {
          var popup = info && info.popup;
          if (popup) {
            setTimeout(function() {
              fillLocalPagePopup(popup);
            }, 300);
          }
        });
      }
    });
  }
})();
