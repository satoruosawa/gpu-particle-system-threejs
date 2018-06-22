uniform sampler2D prevTexture;
uniform int textureSize;

void main() {
  vec4 data = texture2D(prevTexture,
    floor(gl_FragCoord.xy) / float(textureSize));

  vec2 position = data.xy;
  vec2 velocity = data.zw;
  position += velocity;

  gl_FragColor = vec4(position, velocity);
}
