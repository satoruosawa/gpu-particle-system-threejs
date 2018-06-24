import * as Three from 'three'

export default class TexturePass {
  constructor (textureSize, shader, options = {}) {
    this.textureSize = textureSize
    this.isMultipleRenderTargets_ =
      typeof options.isMultipleRenderTargets !== 'undefined'
        ? options.isMultipleRenderTargets : false
    const geometry = new Three.PlaneBufferGeometry(textureSize, textureSize)
    this.shaderMaterial_ = new Three.ShaderMaterial(shader)
    const mesh = new Three.Mesh(geometry, this.shaderMaterial_)
    this.bufScene_ = new Three.Scene()
    this.bufScene_.add(mesh)
    this.bufCamera_ = new Three.Camera()
    this.renderTargets_ = []
    this.currentTextureIndex_ = 0
    this.renderTargets_[0] = this.allocateRenderTarget(textureSize)
    if (this.isMultipleRenderTargets_) {
      this.renderTargets_[1] = this.allocateRenderTarget(textureSize)
    }
  }

  shiftRenderTarget () {
    if (!this.isMultipleRenderTargets_) return
    this.currentTextureIndex_++
    if (this.currentTextureIndex_ >= 2) {
      this.currentTextureIndex_ = 0
    }
  }

  allocateRenderTarget (textureSize) {
    return new Three.WebGLRenderTarget(textureSize, textureSize, {
      minFilter: Three.NearestFilter,
      magFilter: Three.NearestFilter,
      type: Three.FloatType
    })
  }

  render (renderer) {
    renderer.render(this.bufScene_, this.bufCamera_, this.renderTarget_)
  }

  get renderTarget_ () {
    return this.renderTargets_[this.currentTextureIndex_]
  }

  get texture () {
    return this.renderTarget_.texture
  }
}
