exports.drawLines = (regl, line) => {
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
    }`,
    attributes: {
      position: line
    },
    uniforms: {
      color: [1, 1, 1, 1]
    },
    count: line.length,
    primitive: 'line strip'
  })();
}
