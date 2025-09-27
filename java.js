(function () {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
     audio.volumechange = 1.0;
     audio.muted = true;
const unmutedAndPlay = () => {
    audio.muted = false;
    if (audio.paused) { audio.play().catch(() => {
        audio.setAttribute('controls','');
    });
    }
    detach();
};
const attach = (el, ev, opt) => el && el.addEventListener(ev,unmutedAndPlay,opt);
const detach =  () => {
    window.removeEventListener('pointerdown',unmutedAndPlay);
    window.removeEventListener('touchstart',unmutedAndPlay);
    window.removeEventListener('click',unmutedAndPlay);
    document.removeEventListener('keydown',unmutedAndPlay);
    yesBtn &&
    yesBtn.removeEventListener('pointerdown',unmutedAndPlay);
    noBtn &&
    noBtn.removeEventListener('pointerdown',unmutedAndPlay);
  };
  const yesBtn =
  document.querySelector('.button.yes');
  const noBtn =
  document.querySelector('.button.no');

attach(window, 'pointerdown',
    {once:true, passive:true});
attach(window, 'touchstart',
    {once:true, passive:true});
attach(window, 'click',
    {once:true, passive:true});
    document.addEventListener('keydown', unmutedAndPlay, {once:true});
    attach(yesBtn,'pointerdown',
        {once:true, passive:true});
attach(noBtn, 'pointerdown',
    {once:true, passive:true});
})();