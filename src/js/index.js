import * as Three from 'three'

import App from './app/App'
import '../css/index.scss'

// scene
const scene = new Three.Scene()

// camera
const camera = new Three.OrthographicCamera(
  window.innerWidth / -2, window.innerWidth / 2,
  window.innerHeight / 2, window.innerHeight / -2,
  -1000, 1000
)
camera.position.set(0, 0, 100)

// renderer
const renderer = new Three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// app
const app = new App()
scene.add(app.mesh)

// animate
const animate = function () {
  window.requestAnimationFrame(animate)
  app.render(renderer)
  renderer.render(scene, camera)
}

animate()
