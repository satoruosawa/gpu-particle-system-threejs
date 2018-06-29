import * as Three from 'three'

const initialOptions = {
  multipleRenderTargets: false
}

export default class TexturePass {
  constructor (textureSize, shader, options = {}) {
    this.textureSize = textureSize
    this.options_ = Object.assign(initialOptions, options)
    const geometry = new Three.PlaneBufferGeometry(textureSize, textureSize)
    this.shaderMaterial_ = new Three.ShaderMaterial(shader)
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

  allocateRenderTarget (textureSize) {
    return new Three.WebGLRenderTarget(textureSize, textureSize, {
      minFilter: Three.NearestFilter,
      magFilter: Three.NearestFilter,
      type: Three.FloatType
    })
  }

  allocateClearData (textureSize) {
    const data = new Float32Array(textureSize * textureSize * 4)
    for (let i = 0; i < textureSize * textureSize; i++) {
      const index = i * 4
      data[index] = 0 // red
      data[index + 1] = 0 // green
      data[index + 2] = 0 // blue
      data[index + 3] = 0 // alpha
    }
    return data
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
