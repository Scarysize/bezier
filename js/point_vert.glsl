precision mediump float;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform float point_size;

attribute vec2 position;

void main () {
  gl_Position = projection * view * model * vec4(position, 0.0, 1.0);
  gl_PointSize = point_size;
}
