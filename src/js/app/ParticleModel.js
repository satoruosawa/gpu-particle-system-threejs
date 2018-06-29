import * as Three from 'three'

import VelocityModel from './VelocityModel'
import PositionModel from './PositionModel'

export default class ParticleModel {
  constructor (textureSize, numParticles) {
    this.velocityModel_ = new VelocityModel(textureSize, numParticles)
    this.positionModel_ = new PositionModel(textureSize, numParticles)
    this.velocityModel_.positionModel = this.positionModel_
    this.positionModel_.velocityModel = this.velocityModel_
  }

  render (renderer) {
    this.velocityModel_.render(renderer)
    this.positionModel_.render(renderer)
  }

  get texture () {
    return this.positionModel_.texture
  }

  get textureSize () {
    return this.positionModel_.textureSize
  }

  get numParticles() {
    return this.positionModel_.numParticles
  }
}
