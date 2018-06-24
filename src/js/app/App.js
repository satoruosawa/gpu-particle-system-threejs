import * as Three from 'three'

import ParticleModel from './ParticleModel'
import ParticleView from './ParticleView'

export default class App {
  constructor () {
    const textureSize = 512
    const geometry = new Three.PlaneGeometry(textureSize, textureSize)
    const material = new Three.MeshBasicMaterial()
    this.mesh = new Three.Mesh(geometry, material)

    this.particleModel_ = new ParticleModel(textureSize)
    this.particleView_ = new ParticleView(textureSize, this.particleModel_)
    material.map = this.particleView_.texture
  }

  render (renderer) {
    this.particleModel_.render(renderer)
    this.particleView_.render(renderer)
  }
}
