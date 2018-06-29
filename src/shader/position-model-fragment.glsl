#pragma glslify: calcBounceOfWalls3d = require("./calc_bounce_of_walls_3d.glsl")

uniform sampler2D prevVelocityTexture;
uniform sampler2D prevPositionTexture;
uniform int textureSize;

void main() {
  vec4 velocityData = texture2D(prevVelocityTexture,
    floor(gl_FragCoord.xy) / float(textureSize));
  vec4 positionData = texture2D(prevPositionTexture,
    floor(gl_FragCoord.xy) / float(textureSize));

  vec3 position = positionData.xyz;
  vec3 velocity = velocityData.xyz;
  position += velocity;

  mat3 pass_data = calcBounceOfWalls3d(position, velocity, 1.0);
  gl_FragColor = vec4(pass_data[0][0], pass_data[0][1], pass_data[0][2], 0.0);
}
