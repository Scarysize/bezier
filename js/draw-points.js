const mat4 = require('gl-mat4');

const glsl = require('glslify');
const vertexShader = glsl.file('./point_vert.glsl');
const fragmentShader = glsl.file('./point_frag.glsl');

function createDrawPoints(regl, canvas) {
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

  function drawPoints(attributes, uniforms) {
    regl({
      frag: fragmentShader,
      vert: vertexShader,
      attributes: {
        position: attributes.positions
      },
      uniforms: {
        color: uniforms.color || [1, 1, 1, 1],
        model,
        view,
        projection: getProjection,
        point_size: uniforms.pointSize
      },
      count: attributes.positions.length,
      primitive: 'points'
    })();
  }

  return drawPoints;
}


module.exports = createDrawPoints
