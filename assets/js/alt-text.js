(function() {
  'use strict';

  function initAltText() {
    var overlay = document.getElementById('alt-text-overlay');
    var focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var previousFocusedElement = null;

    function showOverlay() {
      if (overlay) {
        overlay.classList.add('active');
      }
      document.body.classList.add('alt-text-no-scroll');
    }

    function hideOverlay() {
      if (overlay) {
        overlay.classList.remove('active');
      }
      document.body.classList.remove('alt-text-no-scroll');
    }

    function trapFocus(element) {
      var focusableElements = element.querySelectorAll(focusableSelectors);
      var firstFocusable = focusableElements[0];
      var lastFocusable = focusableElements[focusableElements.length - 1];

      function handleFocusTrap(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }

      element.addEventListener('keydown', handleFocusTrap);
      return function removeTrap() {
        element.removeEventListener('keydown', handleFocusTrap);
      };
    }

    var activePopup = null;
    var removeFocusTrap = null;

    document.querySelectorAll('.alt-text-button').forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        previousFocusedElement = this;

        var targetId = this.getAttribute('data-target');
        var popup = document.getElementById(targetId + '-description');

        if (popup) {
          if (activePopup && removeFocusTrap) {
            removeFocusTrap();
            activePopup.classList.remove('active');
            activePopup.setAttribute('aria-modal', 'false');
          }

          popup.classList.add('active');
          popup.setAttribute('aria-modal', 'true');
          showOverlay();

          activePopup = popup;
          removeFocusTrap = trapFocus(popup);

          var closeButton = popup.querySelector('.alt-text-close');
          if (closeButton) {
            closeButton.focus();
          }
        }
      });
    });

    document.querySelectorAll('.alt-text-close').forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-target');
        var popup = document.getElementById(targetId + '-description');

        if (popup) {
          if (removeFocusTrap) {
            removeFocusTrap();
            removeFocusTrap = null;
          }

          popup.classList.remove('active');
          popup.setAttribute('aria-modal', 'false');
          activePopup = null;
          hideOverlay();

          if (previousFocusedElement) {
            previousFocusedElement.focus();
            previousFocusedElement = null;
          }
        }
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && activePopup) {
        if (removeFocusTrap) {
          removeFocusTrap();
          removeFocusTrap = null;
        }

        activePopup.classList.remove('active');
        activePopup.setAttribute('aria-modal', 'false');
        activePopup = null;
        hideOverlay();

        if (previousFocusedElement) {
          previousFocusedElement.focus();
          previousFocusedElement = null;
        }
      }
    });

    if (overlay) {
      overlay.addEventListener('click', function() {
        if (activePopup) {
          if (removeFocusTrap) {
            removeFocusTrap();
            removeFocusTrap = null;
          }

          activePopup.classList.remove('active');
          activePopup.setAttribute('aria-modal', 'false');
          activePopup = null;
          hideOverlay();

          if (previousFocusedElement) {
            previousFocusedElement.focus();
            previousFocusedElement = null;
          }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAltText);
  } else {
    initAltText();
  }
})();
