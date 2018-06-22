uniform sampler2D prevTexture;
uniform int textureSize;

int getTextureIndex() {
  return int(gl_FragCoord.x) + int(gl_FragCoord.y) * textureSize;
}

vec2 getCoordFromIndex(int index) {
  return vec2(mod(float(index), float(textureSize)), index / textureSize);
}

void main() {
  int index = getTextureIndex() - 1;
  if (index < 0) {
    index = index + textureSize * textureSize;
  }
  vec4 prevColor = texture2D(
    prevTexture,
    getCoordFromIndex(index) / float(textureSize)
  );
  gl_FragColor = vec4(prevColor.rgb, 1.0);
}
