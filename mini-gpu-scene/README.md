# GPU Instancing & Postprocessing Lab

A compact WebGL2 rendering experiment built to make the GPU pipeline visible: a custom GLSL material renders up to 1,000,000 animated low-poly instances into an offscreen framebuffer, then a handwritten fullscreen shader presents that texture with restrained post effects.

It intentionally focuses on rendering—not gameplay, physics, or a custom engine.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
```

WebGL2 is required.

## Techniques demonstrated

- Handwritten [object vertex shader](src/shaders/object.vert.glsl) with instance transforms and time-based normal displacement.
- Handwritten [object fragment shader](src/shaders/object.frag.glsl) using interpolated normals, `normalize()`, `dot()`, Lambert diffuse lighting, and per-instance colour.
- `THREE.InstancedMesh`: a shared icosahedron geometry and shader material draw up to 1,000,000 objects together.
- A `THREE.WebGLRenderTarget` framebuffer and a handwritten [fullscreen postprocess fragment shader](src/shaders/post.frag.glsl).
- Runtime shader uniform controls and live FPS, draw-call, triangle, and object-count monitoring.

## Rendering pipeline

```text
TypeScript uniform updates
          ↓
Object vertex shader: displace + instance/model/view/projection transforms
          ↓
Object fragment shader: interpolated normal + Lambert lighting
          ↓
WebGLRenderTarget colour texture (offscreen framebuffer)
          ↓
Fullscreen vertex/fragment shaders: RGB split, vignette, scanline
          ↓
Canvas
```

On every frame, `main.ts` updates `uTime`, renders the scene into the render target, then passes its colour texture to the postprocess shader. The object vertex shader emits varying values; rasterization interpolates them over each triangle before the fragment shader consumes them.

## Controls

- Switch between 1, 100, 1,000, 10,000, 100,000, and 1,000,000 instances.
- The top-left metrics are deliberately raw: FPS, object count, draw calls, and triangles only.
- Drag to orbit, use the wheel to zoom, and right-drag to pan. The **Reset camera** control restores the default framing.
- Tune object displacement amplitude, animation speed, and light intensity/direction.
- Toggle postprocessing and adjust RGB split and vignette.

## Draw calls and instancing

A draw call is CPU-side work that tells WebGL to submit geometry and render state to the GPU. Rendering many ordinary meshes with separate calls can make that submission cost substantial. Instancing supplies a transform and colour per object while keeping the geometry and material shared, so the object field is submitted in a single draw call.

The overlay uses `renderer.info.render.calls` and `renderer.info.render.triangles`. Its draw-call figure includes both this instanced object pass and the fullscreen postprocessing pass. Exact FPS and the size of the improvement depend on hardware, resolution, GPU shader cost, geometry complexity, and whether a frame is CPU- or GPU-bound.

## Project boundaries

This is a deliberately small portfolio lab for discussing GLSL stage responsibilities, uniforms, attributes, interpolation, normal-space math, instancing, framebuffers, texture sampling, and CPU/GPU rendering costs. It does not attempt to be a game or a general-purpose renderer.
