precision mediump float;


uniform float thickness;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

attribute vec2 position;
attribute vec2 normal;
attribute float miter;

void main () {
  vec2 p = position.xy + vec2(normal * (thickness / 2.0) * miter);
  gl_Position = projection * view * model * vec4(p, 0.0, 1.0);
  gl_PointSize = 20.0;
}