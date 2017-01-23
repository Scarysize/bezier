exports.drawLines = (regl, attributes, uniforms) => {
  regl({
    frag: `
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = color;
      }
    `,
    vert: `
      precision mediump float;
      attribute vec2 position;
      attribute vec2 normal;
      attribute float miter;

      uniform float thickness;

      void main () {
        vec2 p = position.xy + vec2(normal * thickness/2.0 * miter);
        gl_Position = vec4(p, 0, 1);
      }
    `,
    attributes: {
      normal: attributes.normals,
      miter: attributes.miters,
      position: attributes.positions
    },
    uniforms: {
      color: uniforms.color || [1, 1, 1, 1],
      thickness: uniforms.thickness
    },
    count: attributes.positions.length - 1,
    primitive: 'triangles'
  })();
}
