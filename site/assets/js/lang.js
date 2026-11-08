// 中／英切換：讀取元素上的 data-zh / data-en，選擇會記在 localStorage
(function () {
  var KEY = 'lang';

  function apply(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    document.querySelectorAll('[data-zh]').forEach(function (el) {
      var val = el.getAttribute(lang === 'en' ? 'data-en' : 'data-zh');
      if (val === null) return;
      // 含 HTML 標籤（如數據的 <b>）時用 innerHTML，其餘用 textContent
      if (val.indexOf('<') !== -1) { el.innerHTML = val; } else { el.textContent = val; }
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-btn') === lang));
    });
  }

  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* 私密模式等情況忽略 */ }
  }

  function load() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang-btn');
      apply(lang);
      save(lang);
    });
  });

  if (load() === 'en') apply('en');
})();
