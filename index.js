const bezier = require('./lib/js/ocaml/bezier');
const curve = require('./lib/js/ocaml/curve');
const point = require('./lib/js/ocaml/point');

const {clear, drawLines} = require('./js/draw-lines');

function update(bezierCurve, stepSize) {
  const step = Math.min(0.5, Math.max(0.01, stepSize));
  const line = bezier.sample(bezierCurve, step);

  clear();
  drawLines(line);
}

function init() {
  const slider = document.querySelector('input[type="range"]');
  const indicator = document.querySelector('.step-size');

  const bezierCurve = curve.create(
    point.create(-0.5, -0.5),
    point.create(0.5, -0.5),
    point.create(0, 0)
  );

  slider.addEventListener('input', () => {
    update(bezierCurve, slider.value);
    indicator.textContent = Number(slider.value).toFixed(2);
  });

  update(bezierCurve, slider.value);
}

init();
