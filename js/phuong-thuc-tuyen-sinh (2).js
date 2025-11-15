/* ptts.js — Accordion Methods with TOGGLE (all closed by default) */
(function () {
    if (window.__pttsAccordionInit__) return;
    window.__pttsAccordionInit__ = true;

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        var nav = document.querySelector('.method-nav');
        var methods = Array.prototype.slice.call(document.querySelectorAll('.method'));
        if (!nav || methods.length === 0) return;

        var links = Array.prototype.slice.call(nav.querySelectorAll('.method-link[href^="#"]'));

        function hrefToId(href) {
            if (!href) return '';
            return href.replace(/^.*#/, '').trim();
        }

        function removeHash() {
            try {
                history.pushState(null, '', window.location.pathname + window.location.search);
            } catch (e) {
                // Fallback
                window.location.hash = '';
            }
        }

        function closeAll() {
            for (var i = 0; i < methods.length; i++) methods[i].classList.remove('is-open');
            for (var j = 0; j < links.length; j++) {
                links[j].classList.remove('is-active');
                links[j].setAttribute('aria-expanded', 'false');
            }
        }

        function openById(id, push) {
            if (push === void 0) push = true;
            var method = null, link = null, i;

            for (i = 0; i < methods.length; i++) if (methods[i].id === id) { method = methods[i]; break; }
            for (i = 0; i < links.length; i++)   if (hrefToId(links[i].getAttribute('href')) === id) { link = links[i]; break; }
            if (!method || !link) return;

            closeAll();

            method.classList.add('is-open');
            link.classList.add('is-active');
            link.setAttribute('aria-expanded', 'true');

            if (push) {
                try { history.pushState(null, '', '#' + id); }
                catch (e) { window.location.hash = id; }
            }
        }

        function isOpen(id) {
            for (var i = 0; i < methods.length; i++) {
                if (methods[i].id === id) return methods[i].classList.contains('is-open');
            }
            return false;
        }

        // A11y attributes
        for (var k = 0; k < links.length; k++) {
            links[k].setAttribute('role', 'button');
            links[k].setAttribute('tabindex', '0');
            links[k].setAttribute('aria-expanded', 'false');
        }

        // CLICK (delegation)
        document.addEventListener('click', function (e) {
            var a = e.target && (e.target.closest ? e.target.closest('.method-link[href^="#"]') : null);
            if (!a && e.target && e.target.matches && e.target.matches('.method-link[href^="#"]')) a = e.target;
            if (!a || !nav.contains(a)) return;
            e.preventDefault();

            var id = hrefToId(a.getAttribute('href'));
            if (!id) return;

            // TOGGLE: nếu đang mở -> đóng lại
            if (isOpen(id)) {
                closeAll();
                removeHash();
                return;
            }

            openById(id, true);

            var target = document.getElementById(id);
            if (target && target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        // KEYBOARD: Enter / Space
        document.addEventListener('keydown', function (e) {
            var key = e.key || e.keyCode;
            var isEnter = key === 'Enter' || key === 13;
            var isSpace = key === ' ' || key === 32;
            if (!isEnter && !isSpace) return;

            var el = document.activeElement;
            if (!el) return;
            var a = (el.closest ? el.closest('.method-link[href^="#"]') : null);
            if (!a && el.matches && el.matches('.method-link[href^="#"]')) a = el;
            if (!a || !nav.contains(a)) return;

            e.preventDefault();
            var id = hrefToId(a.getAttribute('href'));
            if (!id) return;

            if (isOpen(id)) {
                closeAll();
                removeHash();
            } else {
                openById(id, true);
            }
        });

        // INIT: tất cả đóng; nếu có hash hợp lệ thì mở theo hash
        closeAll();
        var initialId = hrefToId(window.location.hash);
        if (initialId) openById(initialId, false);

        // BACK/FORWARD: đồng bộ theo hash (rỗng -> đóng hết)
        window.addEventListener('hashchange', function () {
            var id = hrefToId(window.location.hash);
            if (id) openById(id, false);
            else closeAll();
        });
    });
})();
