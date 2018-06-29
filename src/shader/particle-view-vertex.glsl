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
  vec3 position = calcDataFromTexel(particleId).xyz;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 1.0;
}
