#pragma glslify: calcBounceOfWalls = require("./calc_bounce_of_walls.glsl")

uniform sampler2D prevTexture;
uniform int textureSize;

void main() {
  vec4 data = texture2D(prevTexture,
    floor(gl_FragCoord.xy) / float(textureSize));

  vec2 position = data.xy;
  vec2 velocity = data.zw;
  position += velocity;

  vec4 pass_data = calcBounceOfWalls(position, velocity, 1.0);
  gl_FragColor = pass_data;
}
