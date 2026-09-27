document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openBtn');
  const cover   = document.getElementById('cover');
  const message = document.getElementById('message');
  const bgKitties = document.querySelectorAll('.kitty, .bow-drift, .sparkle');

  const song = document.getElementById('bgSong');
  const soundToggle = document.getElementById('soundToggle');
  let userMuted = false;

  if (soundToggle && song) {
    soundToggle.addEventListener('click', () => {
      if (song.paused) {
        song.play().catch(() => {});
        userMuted = false;
        soundToggle.textContent = '🔊';
      } else {
        song.pause();
        userMuted = true;
        soundToggle.textContent = '🔈';
      }
    });
  }

  if (!openBtn || !cover || !message) return;

  openBtn.addEventListener('click', () => {
    // start the song the first time the letter opens (browsers allow
    // audio right after a real click/tap like this one)
    if (song && !userMuted) {
      song.volume = 0.6;
      song.play().then(() => {
        if (soundToggle) soundToggle.textContent = '🔊';
      }).catch(() => {
        // autoplay was blocked for some reason — user can tap the toggle
      });
    }

    // gentle "wake up" pulse for the floating decorations
    bgKitties.forEach((el, i) => {
      el.style.animationDuration = '0.9s';
      setTimeout(() => { el.style.animationDuration = ''; }, 900 + i * 40);
    });

    // fade + slide the cover out
    cover.classList.add('leaving');

    window.setTimeout(() => {
      cover.classList.add('hidden');
      cover.classList.remove('leaving');

      message.classList.remove('hidden');
      message.classList.add('entering');

      // restart the paragraph reveal animation every time the page opens
      const paragraphs = message.querySelectorAll('.reveal');
      paragraphs.forEach((p) => {
        p.style.animation = 'none';
        // eslint-disable-next-line no-unused-expressions
        p.offsetHeight; // force reflow so the animation restarts
        p.style.animation = '';
      });

      window.setTimeout(() => message.classList.remove('entering'), 650);
    }, 520);
  });
});
