export const useToggleFullscreen = () => {
  const elem = document.querySelector('.game-field__canvas');

  if (!document.fullscreenElement) {
    elem?.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
      );
    });
  } else {
    document.exitFullscreen();
  }
};
