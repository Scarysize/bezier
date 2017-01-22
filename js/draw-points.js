const WHITE = [1, 1, 1, 1];

function drawPoints(regl, points, color = WHITE) {
  regl({
    frag: `
    precision mediump float;
    uniform vec4 color;
    void main () {
      gl_FragColor = color;
    }`,
    vert: `
    precision mediump float;
    attribute vec2 position;
    void main () {
      gl_Position = vec4(position, 0, 1);
      gl_PointSize = 10.0;
    }`,
    attributes: {
      position: points
    },
    uniforms: {color},
    count: points.length,
    primitive: 'points'
  })();
}

exports.drawPoints = drawPoints;