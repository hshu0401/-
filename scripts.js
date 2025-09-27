(function () {
  // Lấy thẻ audio trong trang
  const audio = document.querySelector('audio');
  if (!audio) return;

  // Tải sẵn để giảm trễ khi phát
  audio.setAttribute('preload', 'auto');

  // Cố gắng autoplay ở chế độ muted (được phép bởi trình duyệt)
  audio.muted = true;
  audio.play().catch(() => {
    // Trình duyệt có thể vẫn chặn, không sao, ta sẽ mở khi có tương tác
  });

  // Hàm mở tiếng + bắt đầu phát sau tương tác đầu tiên
  const unlock = () => {
    audio.muted = false;          // bật tiếng
    audio.play().catch(() => {}); // phát nhạc
    // Gỡ listener để không chạy lại
    window.removeEventListener('click', unlock);
    window.removeEventListener('keydown', unlock);
    window.removeEventListener('touchstart', unlock);
  };

  // Gắn các “cử chỉ người dùng” khả dụng
  window.addEventListener('click', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
  window.addEventListener('touchstart', unlock, { once: true });

  // Phím tắt tiện dụng
  document.addEventListener('keydown', (e) => {
    // Space: play/pause
    if (e.key === ' ') {
      if (audio.paused) audio.play();
      else audio.pause();
      e.preventDefault(); // tránh scroll trang khi nhấn space
    }
    // m: mute/unmute
    if (e.key.toLowerCase() === 'm') {
      audio.muted = !audio.muted;
    }
    // + / - : tăng/giảm âm lượng
    if (e.key === '+') {
      audio.volume = Math.min(1, audio.volume + 0.1);
    }
    if (e.key === '-') {
      audio.volume = Math.max(0, audio.volume - 0.1);
    }
  });
})();
