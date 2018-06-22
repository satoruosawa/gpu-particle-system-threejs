uniform sampler2D prevTexture;
uniform int textureSize;

void main() {
  vec4 prevColor = texture2D(prevTexture,
    floor(gl_FragCoord.xy) / float(textureSize));
  prevColor.rgb = prevColor.rgb + 0.01;
  gl_FragColor = vec4(prevColor.rgb, 1.0);
}
