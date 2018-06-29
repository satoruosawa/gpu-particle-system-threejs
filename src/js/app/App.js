import * as Three from 'three'

import ParticleModel from './ParticleModel'
import ParticleView from './ParticleView'

export default class App {
  constructor () {
    const numParticles = 15000
    const modelTextureSize = { width: 128, height: 128 } // should be more than sqrt(numParticles)
    this.particleModel_ = new ParticleModel(modelTextureSize, numParticles)
    this.particleView_ = new ParticleView(this.particleModel_)
  }

  render (renderer) {
    this.particleModel_.render(renderer)
    this.particleView_.render(renderer)
    renderer.render(this.particleView_.scene, this.particleView_.bufCamera)
  }

  get bufCamera () {
    return this.particleView_.bufCamera
  }
}
