// 裝置預覽框的全螢幕按鈕：點擊進入全螢幕，再點一次（或按 Esc）離開
// 瀏覽器不支援時（例如 iPhone Safari）按鈕維持隱藏
(function () {
  var doc = document;
  var supported = doc.fullscreenEnabled || doc.webkitFullscreenEnabled;
  if (!supported) return;

  var buttons = doc.querySelectorAll('[data-fullscreen-target]');

  function current() {
    return doc.fullscreenElement || doc.webkitFullscreenElement;
  }

  // 依目前狀態更新按鈕的無障礙名稱
  function sync() {
    var el = current();
    buttons.forEach(function (btn) {
      var on = el && el.id === btn.getAttribute('data-fullscreen-target');
      btn.setAttribute('aria-label', on ? '離開全螢幕' : btn.getAttribute('data-label'));
    });
  }

  buttons.forEach(function (btn) {
    var target = doc.getElementById(btn.getAttribute('data-fullscreen-target'));
    if (!target) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (current()) {
        (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
      } else {
        (target.requestFullscreen || target.webkitRequestFullscreen).call(target);
      }
    });
  });

  doc.addEventListener('fullscreenchange', sync);
  doc.addEventListener('webkitfullscreenchange', sync);
})();
