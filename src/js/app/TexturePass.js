import * as Three from 'three'

const initialOptions = {
  multipleRenderTargets: false,
  transparent: false
}

export default class TexturePass {
  constructor (textureSize, shader, options = {}) {
    this.textureSize = textureSize
    this.options_ = Object.assign(initialOptions, options)
    const geometry = new Three.PlaneBufferGeometry(textureSize, textureSize)
    this.shaderMaterial_ = this.allocateShader(shader)
    const mesh = new Three.Mesh(geometry, this.shaderMaterial_)
    this.bufScene_ = new Three.Scene()
    this.bufScene_.add(mesh)
    this.bufCamera_ = new Three.Camera()
    this.renderTargets_ = []
    this.currentTextureIndex_ = 0
    this.renderTargets_[0] = this.allocateRenderTarget(textureSize)
    if (this.options_.multipleRenderTargets) {
      this.renderTargets_[1] = this.allocateRenderTarget(textureSize)
    }
  }

  shiftRenderTarget () {
    if (!this.options_.multipleRenderTargets) return
    this.currentTextureIndex_++
    if (this.currentTextureIndex_ >= 2) {
      this.currentTextureIndex_ = 0
    }
  }

  allocateShader (shader) {
    return new Three.ShaderMaterial(Object.assign({
      transparent: this.options_.transparent
    }, shader))
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
