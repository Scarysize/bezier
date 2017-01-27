/* NODE_MODULES */
const getNormals = require('polyline-normals');
const fit = require('canvas-fit');

/* OCAML MODULES */
const bezier = require('./lib/js/ocaml/bezier');
const curve = require('./lib/js/ocaml/curve');
const point = require('./lib/js/ocaml/point');

/* JS MODULES */
const {createDrawLine} = require('./js/draw-lines');
const {drawPoints} = require('./js/draw-points');

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth / 2;
canvas.height = window.innerWidth / 2;
const regl = require('regl')(canvas);

const drawLine = createDrawLine(regl, canvas);

const clear = () =>
  regl.clear({
      color: [0, 0, 0, 1],
      depth: 1
  });

function duplicate(array, shouldFlipp) {
  const out = [];
  array.forEach(item => {
    let flipped = shouldFlipp ? -item : item;
    out.push(flipped, item);
  });

  return out;
}

function createIndices(length) {
  let indices = new Uint16Array((length - 1) * 6)
  let c = 0, index = 0
  for (let j=0; j<length - 1; j++) {
    let i = index
    indices[c++] = i + 0
    indices[c++] = i + 1
    indices[c++] = i + 2
    indices[c++] = i + 2
    indices[c++] = i + 1
    indices[c++] = i + 3
    index += 2
  }

  return indices
}

/**
 * Updates the rendered line strip.
 * @param  {object} bezierCurve  The curve to sample
 * @param  {number} stepSize  The sampling rate
 */
function update(bezierCurve, stepSize) {
  const step = Math.min(0.5, Math.max(0.01, stepSize));
  const path = bezier.sample(bezierCurve, step);

  const tags = getNormals(path);
  const normals = duplicate(tags.map(t => t[0]));
  const miters = duplicate(tags.map(t => t[1]), true);
  const positions = duplicate(path);
  const indices = createIndices(path.length);
  const lineAttributes = {
    positions,
    normals,
    miters
  };
  const lineUniforms = {
    color: [1, 1, 1, 1],
    thickness: 20.0
  };
  const elements = regl.elements({
    type: 'uint16',
    data: indices
  });

  clear();
  drawLine(
    lineAttributes,
    lineUniforms,
    elements
  );
}

function init() {
  const slider = document.querySelector('input[type="range"]');
  const indicator = document.querySelector('.step-size');
  const {width, height} = canvas;

  const bezierCurve = curve.create(
    point.create(width * 0.1, height * 0.75),
    point.create(width * 0.9, height * 0.75),
    point.create(width * 0.1, height * 0.75)
  );

  slider.addEventListener('input', () => {
    update(bezierCurve, slider.value);
    indicator.textContent = Number(slider.value).toFixed(2);
  });

  update(bezierCurve, slider.value);
}

init();