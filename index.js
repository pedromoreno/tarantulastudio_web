// Efecto de fondo desactivado temporalmente
// import fragmentShaderSource from './shader.js';
// import { createRenderer } from './glsl-sandbox.js';

function initBackground() {
  // Desactivado temporalmente
  return;
  
  /* 
  try {
    const { canvas, draw } = createRenderer(fragmentShaderSource);

    const shouldHaveHeadStart = !document.documentElement.classList.contains('first-load')
      || document.documentElement.classList.contains('subpage');

    const headStart = shouldHaveHeadStart ? 1000 : 0;

    canvas.id = 'bg';
    
    // Wait for DOM to be ready if needed
    const appendCanvas = () => {
      if (document.body) {
        document.body.appendChild(canvas);
        initCanvas(canvas, draw, headStart);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', appendCanvas);
    } else {
      appendCanvas();
    }
  } catch (error) {
    console.error('Error initializing background:', error);
    // Continue without background animation - site should still work
  }
  */
}

function initCanvas(canvas, draw, headStart) {
  const onWindowResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  const mouse = new DOMPoint(0, 0);

  window.addEventListener('pointermove', (event) => {
    mouse.x = event.clientX / window.innerWidth;
    mouse.y = event.clientY / window.innerHeight;
  });

  const renderedMouse = new DOMPoint(0, 0);

  const animate = (time) => {
    // smoothly transition to the new mouse position
    if (Math.abs(mouse.x - renderedMouse.x) > 1e-1) {
      renderedMouse.x += (mouse.x - renderedMouse.x) / 20;
    }
    if (Math.abs(mouse.y - renderedMouse.y) > 1e-1) {
      renderedMouse.y += (mouse.y - renderedMouse.y) / 20;
    }

    requestAnimationFrame(animate);
    try {
      draw(time + headStart, renderedMouse.x, renderedMouse.y, canvas.width, canvas.height, false);
    } catch (error) {
      console.error('Error drawing:', error);
    }
  };

  requestAnimationFrame(animate);
}

// Initialize when module loads - DESACTIVADO TEMPORALMENTE
// initBackground();

export const startAnimating = () => {
  // Already started in initBackground
};
