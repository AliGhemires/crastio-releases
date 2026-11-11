// The film on the home page. Without this script the video keeps its own controls and its poster.
// With it: plays muted while it is on screen (unless the visitor asked for reduced motion or the
// browser refuses autoplay), pauses when scrolled away, and offers Pause and Sound buttons.
(() => {
  const box = document.querySelector("[data-film]");
  const video = box?.querySelector("video");
  if (!video) return;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const play = box.querySelector("[data-film-play]"), sound = box.querySelector("[data-film-sound]");
  let wanted = !calm; // whether the visitor wants it playing
  const label = () => {
    play.textContent = video.paused ? "Play" : "Pause";
    play.setAttribute("aria-label", video.paused ? "Play the film" : "Pause the film");
    sound.textContent = video.muted ? "Sound off" : "Sound on";
    sound.setAttribute("aria-pressed", String(!video.muted));
  };
  const start = () => video.play().then(() => { video.removeAttribute("controls"); box.classList.add("is-live"); label(); }).catch(() => { /* autoplay refused: the native controls stay */ });
  play.addEventListener("click", () => { wanted = video.paused; if (wanted) start(); else video.pause(); });
  sound.addEventListener("click", () => { video.muted = !video.muted; if (!video.muted && video.paused) { wanted = true; start(); } label(); });
  video.addEventListener("play", label);
  video.addEventListener("pause", label);
  if (calm) { label(); return; } // reduced motion: nothing moves until the visitor presses Play
  if (!("IntersectionObserver" in window)) { start(); return; }
  new IntersectionObserver(([e]) => { if (e.isIntersecting && wanted) start(); else if (!e.isIntersecting && !video.paused) video.pause(); }, { threshold: 0.35 }).observe(box);
})();
