/* NODE_MODULES */
const getNormals = require('polyline-normals');
const fit = require('canvas-fit');

/* OCAML MODULES */
const bezier = require('./lib/js/ocaml/bezier');
const curve = require('./lib/js/ocaml/curve');
const point = require('./lib/js/ocaml/point');
const util = require('./lib/js/ocaml/util');

/* JS MODULES */
const createDrawLine = require('./js/draw-lines');
const createDrawPoints = require('./js/draw-points');
const createIndices = require('./js/create-indices');

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth / 2;
canvas.height = window.innerWidth / 2;
const regl = require('regl')(canvas);

const drawLine = createDrawLine(regl, canvas);
const drawPoints = createDrawPoints(regl, canvas);

function clear() {
  regl.clear({
    color: [1, 1, 1, 1],
    depth: 1
  });
}

/**
 * Updates the rendered line strip.
 * @param  {object} bezierCurve  The curve to sample
 * @param  {number} stepSize  The sampling rate
 * @param  {number} thickness  The thickness of the line
 */
function update(bezierCurve, stepSize = 0.1, thickness = 0.5) {
  const step = Math.min(0.5, Math.max(0.01, stepSize));
  const path = bezier.sample(bezierCurve, step);

  const tags = getNormals(path);
  const normals = util.duplicate(tags.map(t => t[0]));
  const miters = util.duplicate(tags.map(t => t[1]), true);
  const positions = util.duplicate(path);
  const indices = createIndices(path.length);
  const lineAttributes = {
    positions,
    normals,
    miters
  };
  const lineUniforms = {
    color: util.normalize_color([88, 88, 88, 1]),
    thickness: Number(thickness)
  };
  const lineElements = regl.elements({
    type: 'uint16',
    data: indices
  });
  const curveAttributes = {
    positions: [
      curve.getStart(bezierCurve),
      curve.getControl(bezierCurve),
      curve.getEnd(bezierCurve),
    ]
  };
  const curveUniforms = {
    color: util.normalize_color([30, 155, 81, 1]),
    pointSize: 7
  };

  clear();
  drawPoints(curveAttributes, curveUniforms);
  drawLine(lineAttributes, lineUniforms, lineElements);
}

function init() {
  const {width, height} = canvas;
  const bezierCurve = curve.create(
    point.create(width * 0.1, height * 0.75),
    point.create(width * 0.9, height * 0.75),
    point.create(width * 0.5, height * 0.1)
  );

  const slider = document.querySelector('input[type="range"]');
  const indicator = document.querySelector('.step-size');
  slider.addEventListener('input', runUpdates);

  const thicknessSlider = document.querySelector('.thickness');
  const thicknessIndicator = document.querySelector('.line-thickness');
  thicknessSlider.addEventListener('input', runUpdates);

  function runUpdates() {
    const thickness = thicknessSlider.value;
    const stepSize = slider.value;

    update(bezierCurve, stepSize, thickness);

    indicator.textContent = Number(stepSize).toFixed(2);
    thicknessIndicator.textContent = Number(thickness).toFixed(2);
  }

  update(bezierCurve, slider.value, thicknessSlider.value);
}

init();
