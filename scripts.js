// script.js — baseline chắc chắn phát sau 1 tương tác
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  // đảm bảo volume và unmute
  audio.volume = 1.0;
  audio.muted = false;

  // 1 hàm duy nhất để phát nhạc sau tương tác
  const startPlay = () => {
    audio.muted = false;
    audio.play()
      .then(() => detach())
      .catch(err => {
        console.log('Play failed:', err);
        // nếu vẫn bị chặn, hiện controls để user bấm Play
        audio.setAttribute('controls', '');
      });
  };

  // gắn vào nhiều loại tương tác để chắc trên mobile
  const attach = (el, ev, opts) => el && el.addEventListener(ev, startPlay, opts);
  const detach = () => {
    window.removeEventListener('pointerdown', startPlay, oncePassive);
    window.removeEventListener('touchstart', startPlay, oncePassive);
    window.removeEventListener('click', startPlay, oncePassive);
    document.removeEventListener('keydown', startPlay, once);
    yesBtn && yesBtn.removeEventListener('pointerdown', startPlay, oncePassive);
    noBtn  && noBtn.removeEventListener('pointerdown', startPlay, oncePassive);
  };

  const oncePassive = { once: true, passive: true };
  const once = { once: true };

  const yesBtn = document.querySelector('.button.yes');
  const noBtn  = document.querySelector('.button.no');

  attach(window, 'pointerdown', oncePassive);
  attach(window, 'touchstart', oncePassive);
  attach(window, 'click', oncePassive);
  attach(document, 'keydown', once);           // phòng khi dùng bàn phím
  attach(yesBtn, 'pointerdown', oncePassive);  // gắn trực tiếp lên nút
  attach(noBtn,  'pointerdown', oncePassive);
});
