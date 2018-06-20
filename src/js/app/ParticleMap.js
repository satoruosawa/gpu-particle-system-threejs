import * as Three from 'three'

export default class ParticleMap {
  constructor(size) {
    this.bufScene = new Three.Scene()
    const geometry = new Three.PlaneGeometry(size, size)
    const shaderMaterial = this.allocShader()
    const mesh = new Three.Mesh(geometry, shaderMaterial)
    this.bufScene.add(mesh)
    this.bufCamera = new Three.Camera()
    this.renderTarget = new Three.WebGLRenderTarget(size, size)
  }

  allocShader() {
    return new Three.ShaderMaterial({
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    })
  }

  render(renderer) {
    renderer.render(this.bufScene, this.bufCamera, this.renderTarget)
  }
}
