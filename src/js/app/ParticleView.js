import * as Three from 'three'

import TexturePass from './TexturePass'
import vertexShader from '../../shader/particle-view-vertex.glsl'
import fragmentShader from '../../shader/particle-view-fragment.glsl'

export default class ParticleView extends TexturePass {
  constructor (textureSize, particleModel) {
    const uniforms = {
      particleTexture: { type: 't', value: particleModel.texture },
      particleTextureSize: { type: 'i', value: particleModel.textureSize }
    }
    const shader = {
      transparent: true,
      uniforms,
      vertexShader,
      fragmentShader
    }
    super(textureSize, shader)
    this.bufCamera_ = new Three.PerspectiveCamera(30, 1, 0.01, 200)
    this.bufCamera_.position.z = 2

    this.particleModel_ = particleModel
    this.overwriteParticleScene()
  }

  overwriteParticleScene () {
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
    this.bufScene_.rotation.x -= 0.001
    this.bufScene_.rotation.z -= 0.001
    super.render(renderer)
  }

  updateUniforms () {
    const uniforms = this.shaderMaterial_.uniforms
    uniforms.particleTexture.value = this.particleModel_.texture
  }

  get bufCamera () {
    return this.bufCamera_
  }
}
