import * as Three from 'three'

import vertexShader from '../../shader/particle-view-vertex.glsl'
import fragmentShader from '../../shader/particle-view-fragment.glsl'

export default class ParticleView {
  constructor (textureSize, particleModel) {
    this.bufScene_ = new Three.Scene()
    this.bufCamera_ = new Three.Camera()
    this.uniforms_ = {
      particleTexture: { type: 't', value: particleModel.texture },
      particleTextureSize: { type: 'i', value: particleModel.textureSize }
    }
    const shader = {
      uniforms: this.uniforms_,
      vertexShader,
      fragmentShader
    }
    this.shaderMaterial_ = new Three.ShaderMaterial(shader)
    this.particleModel_ = particleModel
    this.allocateParticles()

    this.renderTarget_ = this.allocateRenderTarget(textureSize)
  }

  allocateRenderTarget (textureSize) {
    return new Three.WebGLRenderTarget(textureSize, textureSize, {
      minFilter: Three.NearestFilter,
      magFilter: Three.NearestFilter,
      type: Three.FloatType
    })
  }

  allocateParticles () {
    const verticesBase = []
    for (let i = 0; i < this.particleModel_.numParticles; i++) {
      const x = i
      const y = 0
      const z = 0
      verticesBase.push(x, y, z)
    }
    const vertices = new Float32Array(verticesBase)
    const geometry = new Three.BufferGeometry()
    geometry.addAttribute('position', new Three.BufferAttribute(vertices, 3))
    const points = new Three.Points(geometry, this.shaderMaterial_)
    points.matrixAutoUpdate = true
    this.bufScene_ = new Three.Scene()
    this.bufScene_.add(points)
  }

  render (renderer) {
    this.updateUniforms()
    renderer.render(this.bufScene_, this.bufCamera_, this.renderTarget_)
  }

  updateUniforms () {
    this.uniforms_.particleTexture.value = this.particleModel_.texture
  }

  get texture () {
    return this.renderTarget_.texture
  }
}
