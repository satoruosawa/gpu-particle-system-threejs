uniform sampler2D particleTexture;
uniform int particleTextureSize;

vec2 getCoordFromId(int id, int textureSize) {
  return vec2(mod(float(id), float(textureSize)), id / textureSize);
}

vec4 calcDataFromTexel(int id) {
  return texture2D(particleTexture,
    getCoordFromId(id, particleTextureSize) / float(particleTextureSize));
}

void main(void)	{
  int particleId = int(position.x);
  vec2 pos = calcDataFromTexel(particleId).xy;
  gl_Position = vec4(pos.xy, 0.0, 1.0);
  gl_PointSize = 10.0;
}
