import { raf } from "../dist/js/wrap.js";

// Initial HMR Setup
if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    document.querySelector("canvas").remove();
    renderer.forceContextLoss();
    renderer.context = null;
    renderer.domElement = null;
    renderer = null;
    cancelAnimationFrame(animationId);
    removeEventListener("resize", resize);
  });
}

raf();
