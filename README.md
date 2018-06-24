# gpu-particle-system-threejs

## Install
- `npm install`

## Commands
- `npm start` - start the dev server
- `npm run build` - build in dist folder
- `npm run lint` - run 'standard' lint check

## notice
- The DataTexture uses the types THREE.FloatType. So the WebGL implementation must support the respective extensions OES_texture_float.
- It seems that in fact rendering to floating point textures is the issue on iOS. Need to use HALF_FLOAT.
https://github.com/yomboprime/GPGPU-threejs-demos/issues/5
