export const getRangeFromViewportWidth = () => {
  const viewportWidth = window.innerWidth;

  if (viewportWidth <= 390) {
    return 3;
  } else if (viewportWidth <= 500) {
    return 4;
    // sm
  } else if (viewportWidth <= 640) {
    return 6;
    // md
  } else if (viewportWidth <= 768) {
    return 8;
    // lg
  } else if (viewportWidth <= 1024) {
    return 9;
  } else {
    return 10;
  }
};
