// Mobile nav toggle + WhatsApp float visibility on scroll.
(function () {
    'use strict';

    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!open));
            navLinks.style.display = open ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '64px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = '#FFF';
            navLinks.style.padding = '20px 24px';
            navLinks.style.borderBottom = '1px solid var(--rule-soft)';
            navLinks.style.boxShadow = 'var(--shadow-md)';
        });
    }

    var whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        var toggleVisibility = function () {
            if (window.scrollY > 400) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.pointerEvents = 'auto';
            } else {
                whatsappFloat.style.opacity = '0';
                whatsappFloat.style.pointerEvents = 'none';
            }
        };
        whatsappFloat.style.transition = 'opacity 0.2s ease';
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.pointerEvents = 'none';
        toggleVisibility();
        window.addEventListener('scroll', toggleVisibility, { passive: true });
    }
})();
