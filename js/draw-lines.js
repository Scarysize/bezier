const mat4 = require('gl-mat4');

const glsl = require('glslify');
const vertexShader = glsl.file('./vertex.glsl');
const fragmentShader = glsl.file('./fragment.glsl');

function createDrawLine(regl, canvas) {
  const model = mat4.identity(mat4.create());
  const view = mat4.identity(mat4.create());
  const getProjection = () => mat4.ortho(
    [],
    0,      // left
    canvas.width,  // right
    canvas.height, // bottom
    0,      // top
    0,      // near
    1       // far
  );

  function drawLine(attributes, uniforms, elements) {
    regl({
      frag: fragmentShader,
      vert: vertexShader,
      attributes: {
        normal: attributes.normals,
        miter: attributes.miters,
        position: attributes.positions
      },
      uniforms: {
        color: uniforms.color || [1, 1, 1, 1],
        thickness: uniforms.thickness,
        model,
        view,
        projection: getProjection
      },
      elements
    })();
  }

  return drawLine;
}

exports.createDrawLine = createDrawLine;