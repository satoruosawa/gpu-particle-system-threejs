import * as Three from 'three'

const initialOptions = {
  multipleRenderTargets: false
}

export default class TexturePass {
  constructor (shader, textureSize = { width: 1, height: 1 }, options = {}) {
    this.textureSize = textureSize
    this.options_ = Object.assign(initialOptions, options)
    this.shaderMaterial_ = new Three.ShaderMaterial(shader)
    this.bufScene_ = new Three.Scene()
    this.bufCamera_ = new Three.Camera()
    this.renderTargets_ = []
    this.currentTextureIndex_ = 0
    this.renderTargets_[0] = this.allocateRenderTarget(textureSize)
    if (this.options_.multipleRenderTargets) {
      this.renderTargets_[1] = this.allocateRenderTarget(textureSize)
    }
  }

  allocateMesh (textureSize, material) {
    const geometry = new Three.PlaneBufferGeometry(
      textureSize.width, textureSize.height
    )
    return new Three.Mesh(geometry, material)
  }

  shiftRenderTarget () {
    if (!this.options_.multipleRenderTargets) return
    this.currentTextureIndex_++
    if (this.currentTextureIndex_ >= 2) {
      this.currentTextureIndex_ = 0
    }
  }

  allocateRenderTarget (textureSize) {
    return new Three.WebGLRenderTarget(textureSize.width, textureSize.height, {
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
