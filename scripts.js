// script.js
(function () {
  const audio = document.getElementById('bg-music');
  const btnYes = document.querySelector('.button.yes');
  const btnNo  = document.querySelector('.button.no');
  if (!audio) return;

  // Chuẩn bị: tải sẵn và thử play ở chế độ muted (được phép)
  audio.preload = 'auto';
  audio.muted = true;
  audio.play().catch(() => { /* có thể bị chặn, không sao */ });

  // Hàm mở tiếng & phát sau tương tác đầu tiên
  const unlock = () => {
    audio.muted = false;
    audio.play().then(() => {
      detach();
    }).catch(() => {
      // Nếu vẫn bị chặn, hiện điều khiển để user bấm Play
      audio.setAttribute('controls', '');
    });
  };

  // Gắn nhiều loại tương tác cho chắc trên mobile
  const attach = (el, type) => el && el.addEventListener(type, unlock, { once: true, passive: true });
  const detach = () => {
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('touchstart', unlock);
    window.removeEventListener('click', unlock);
    document.removeEventListener('keydown', unlock);
    btnYes && btnYes.removeEventListener('pointerdown', unlock);
    btnNo  && btnNo.removeEventListener('pointerdown', unlock);
  };

  attach(window, 'pointerdown');
  attach(window, 'touchstart');
  attach(window, 'click');
  document.addEventListener('keydown', unlock, { once: true }); // phòng khi dùng bàn phím
  attach(btnYes, 'pointerdown');
  attach(btnNo,  'pointerdown');

  // Phím tắt tiện: space play/pause, m mute, +/- volume
  document.addEventListener('keydown', (e) => {
    if (!audio) return;
    if (e.key === ' ') { audio.paused ? audio.play() : audio.pause(); e.preventDefault(); }
    if (e.key.toLowerCase() === 'm') audio.muted = !audio.muted;
    if (e.key === '+') audio.volume = Math.min(1, audio.volume + 0.1);
    if (e.key === '-') audio.volume = Math.max(0, audio.volume - 0.1);
  });
})();
