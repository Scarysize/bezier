const bezier = require('./lib/js/ocaml/bezier');
const curve = require('./lib/js/ocaml/curve');
const point = require('./lib/js/ocaml/point');

const {drawLines} = require('./js/draw-lines');
const {drawPoints} = require('./js/draw-points');

const regl = require('regl')({
  container: document.querySelector('.container')
});
const clear = () =>
  regl.clear({
      color: [0, 0, 0, 1],
      depth: 1
  });

/**
 * Updates the rendered line strip.
 * @param  {object} bezierCurve  The curve to sample
 * @param  {number} stepSize  The sampling rate
 */
function update(bezierCurve, stepSize) {
  const step = Math.min(0.5, Math.max(0.01, stepSize));
  const line = bezier.sample(bezierCurve, step);

  clear();
  drawLines(regl, line);
  drawPoints(regl, line);
}

function init() {
  const slider = document.querySelector('input[type="range"]');
  const indicator = document.querySelector('.step-size');

  const bezierCurve = curve.create(
    point.create(-0.5, -0.5),
    point.create(0.5, -0.5),
    point.create(0, -0.5)
  );

  slider.addEventListener('input', () => {
    update(bezierCurve, slider.value);
    indicator.textContent = Number(slider.value).toFixed(2);
  });

  update(bezierCurve, slider.value);
}

init();