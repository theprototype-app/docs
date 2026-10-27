// Roadmap 83 V4: the short loops play muted and on repeat — unless the reader asked for reduced
// motion, in which case they stay paused on their first frame and get the normal controls.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  function apply() {
    document.querySelectorAll('video.shot').forEach(function (v) {
      if (reduce && reduce.matches) {
        v.removeAttribute('autoplay');
        v.pause();
        v.currentTime = 0;
        v.controls = true;
      } else if (v.hasAttribute('loop')) {
        v.controls = false;
        v.play().catch(function () { v.controls = true; });
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  if (reduce && reduce.addEventListener) reduce.addEventListener('change', apply);
})();
