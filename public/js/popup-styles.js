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
})();
