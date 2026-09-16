'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero's 3D centrepiece: a displaced "ember core" wrapped in a
 * counter-rotating wireframe shell, a lattice of neural nodes with
 * proximity-linked edges, and a drifting particle field.
 *
 * Built against three.js directly rather than a React renderer so the frame
 * loop stays outside React entirely. Budget discipline:
 *   • device pixel ratio clamped to 1.5
 *   • 30 fps ceiling (halves GPU cost, visually identical for slow drift)
 *   • paused when scrolled out of view or the tab is hidden
 *   • every geometry, material and the renderer disposed on unmount
 *   • bails out cleanly if WebGL is unavailable or the context is lost
 *
 * Only mounted for `allow3D` devices — see NeuralCore's dynamic wrapper.
 */
export default function NeuralCore() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    import('three')
      .then((THREE) => {
        if (disposed || !mount) return;

        const W = mount.clientWidth || 1;
        const H = mount.clientHeight || 1;

        let renderer: import('three').WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: true,
          });
        } catch {
          // No WebGL, or software rendering only — the CSS glow behind this
          // canvas already looks intentional, so just stay out of the way.
          return;
        }

        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 120);
        camera.position.set(0, 0, 11);

        const world = new THREE.Group();
        scene.add(world);

        /* ── Ember core: displaced icosahedron with a fresnel rim ──────── */
        const coreGeo = new THREE.IcosahedronGeometry(2.5, 24);
        const coreMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uHot: { value: new THREE.Color('#ff7a5c') },
            uCold: { value: new THREE.Color('#c41e0f') },
          },
          vertexShader: /* glsl */ `
            uniform float uTime;
            varying vec3 vNormalW;
            varying vec3 vViewDir;
            varying float vRidge;

            void main() {
              // Cheap trig-based turbulence. Three overlapping waves at
              // different speeds read as organic without a noise texture.
              float d =
                  sin(position.x * 1.8 + uTime * 0.9)
                * cos(position.y * 1.7 - uTime * 0.7)
                * sin(position.z * 1.9 + uTime * 0.5);

              float d2 = sin(position.y * 3.4 + uTime * 1.3) * 0.35;

              vRidge = d;
              vec3 displaced = position + normal * (d * 0.30 + d2 * 0.12);

              vNormalW = normalize(normalMatrix * normal);
              vec4 mv  = modelViewMatrix * vec4(displaced, 1.0);
              vViewDir = normalize(-mv.xyz);

              gl_Position = projectionMatrix * mv;
            }
          `,
          fragmentShader: /* glsl */ `
            uniform vec3 uHot;
            uniform vec3 uCold;
            varying vec3 vNormalW;
            varying vec3 vViewDir;
            varying float vRidge;

            void main() {
              // Rim light: brightest where the surface turns away from us.
              float fres = pow(1.0 - abs(dot(normalize(vNormalW), normalize(vViewDir))), 2.6);
              vec3 col = mix(uCold, uHot, clamp(vRidge * 0.5 + 0.5, 0.0, 1.0));
              float a = fres * 0.85;
              gl_FragColor = vec4(col * (0.35 + fres * 1.6), a);
            }
          `,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        world.add(core);

        /* ── Counter-rotating wireframe shell ──────────────────────────── */
        const shellGeo = new THREE.IcosahedronGeometry(3.6, 1);
        const shellWire = new THREE.WireframeGeometry(shellGeo);
        const shellMat = new THREE.LineBasicMaterial({
          color: 0x2ad4f0,
          transparent: true,
          opacity: 0.17,
        });
        const shell = new THREE.LineSegments(shellWire, shellMat);
        world.add(shell);
        shellGeo.dispose();

        /* ── Neural lattice: nodes on a Fibonacci sphere + near edges ──── */
        const NODE_COUNT = 110;
        const R = 4.6;
        const nodes: [number, number, number][] = [];
        const golden = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < NODE_COUNT; i++) {
          const y = 1 - (i / (NODE_COUNT - 1)) * 2;
          const r = Math.sqrt(Math.max(0, 1 - y * y));
          const theta = golden * i;
          nodes.push([Math.cos(theta) * r * R, y * R * 0.72, Math.sin(theta) * r * R]);
        }

        const nodePos = new Float32Array(nodes.length * 3);
        const nodeCol = new Float32Array(nodes.length * 3);
        const palette = [
          [1.0, 0.48, 0.36], // ember light
          [0.94, 0.23, 0.14], // ember
          [0.94, 0.23, 0.14],
          [0.16, 0.83, 0.94], // signal
          [0.94, 0.71, 0.29], // brass
        ];

        nodes.forEach((n, i) => {
          nodePos[i * 3] = n[0];
          nodePos[i * 3 + 1] = n[1];
          nodePos[i * 3 + 2] = n[2];
          const c = palette[Math.floor(Math.random() * palette.length)];
          nodeCol[i * 3] = c[0];
          nodeCol[i * 3 + 1] = c[1];
          nodeCol[i * 3 + 2] = c[2];
        });

        const latticeGeo = new THREE.BufferGeometry();
        latticeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
        latticeGeo.setAttribute('color', new THREE.BufferAttribute(nodeCol, 3));
        const latticeMat = new THREE.PointsMaterial({
          size: 0.062,
          sizeAttenuation: true,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        });
        world.add(new THREE.Points(latticeGeo, latticeMat));

        // Connect node pairs closer than a threshold — O(n²) over 110 points
        // is ~6k checks, run once at startup.
        const edges: number[] = [];
        const MAX_D2 = 2.35 * 2.35;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i][0] - nodes[j][0];
            const dy = nodes[i][1] - nodes[j][1];
            const dz = nodes[i][2] - nodes[j][2];
            if (dx * dx + dy * dy + dz * dz < MAX_D2) {
              edges.push(...nodes[i], ...nodes[j]);
            }
          }
        }
        const edgeGeo = new THREE.BufferGeometry();
        edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edges), 3));
        const edgeMat = new THREE.LineBasicMaterial({
          color: 0xef3b23,
          transparent: true,
          opacity: 0.13,
        });
        world.add(new THREE.LineSegments(edgeGeo, edgeMat));

        /* ── Ambient dust ──────────────────────────────────────────────── */
        const DUST = 220;
        const dustPos = new Float32Array(DUST * 3);
        for (let i = 0; i < DUST; i++) {
          dustPos[i * 3] = (Math.random() - 0.5) * 30;
          dustPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
          dustPos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
          color: 0xff7a5c,
          size: 0.026,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);

        /* ── Input: pointer parallax + scroll drift ────────────────────── */
        let px = 0;
        let py = 0;
        let scrollN = 0;
        let lastPointer = 0;

        const onPointer = (e: PointerEvent) => {
          const now = performance.now();
          if (now - lastPointer < 30) return; // ~33 Hz is plenty for parallax
          lastPointer = now;
          px = (e.clientX / window.innerWidth - 0.5) * 2;
          py = (e.clientY / window.innerHeight - 0.5) * -2;
        };

        let scrollTick = false;
        const onScroll = () => {
          if (scrollTick) return;
          scrollTick = true;
          requestAnimationFrame(() => {
            scrollTick = false;
            scrollN = window.scrollY / Math.max(window.innerHeight, 1);
          });
        };

        window.addEventListener('pointermove', onPointer, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });

        const onResize = () => {
          const nw = mount.clientWidth || 1;
          const nh = mount.clientHeight || 1;
          renderer.setSize(nw, nh);
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();

          // Slide the core toward the right column so it frames the copy
          // instead of sitting behind it. Falls back to centred when narrow.
          world.position.x = nw > 1080 ? 2.6 : 0;
        };
        onResize();
        const ro = new ResizeObserver(onResize);
        ro.observe(mount);

        /* ── Pause when not visible ────────────────────────────────────── */
        let onScreen = true;
        const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), {
          threshold: 0,
        });
        io.observe(mount);

        let tabVisible = !document.hidden;
        const onVis = () => (tabVisible = !document.hidden);
        document.addEventListener('visibilitychange', onVis);

        /* ── Context loss ──────────────────────────────────────────────── */
        let contextLost = false;
        const onLost = (e: Event) => {
          e.preventDefault();
          contextLost = true;
        };
        const onRestored = () => {
          contextLost = false;
        };
        renderer.domElement.addEventListener('webglcontextlost', onLost);
        renderer.domElement.addEventListener('webglcontextrestored', onRestored);

        /* ── Frame loop, capped at 30 fps ──────────────────────────────── */
        const FRAME_MS = 1000 / 30;
        let raf = 0;
        let last = 0;
        let t = 0;

        const loop = (now: number) => {
          raf = requestAnimationFrame(loop);
          if (!onScreen || !tabVisible || contextLost) return;
          if (now - last < FRAME_MS) return;
          last = now;

          t += 0.016;
          coreMat.uniforms.uTime.value = t;

          world.rotation.y = t * 0.085 + scrollN * 0.5;
          world.rotation.x = Math.sin(t * 0.3) * 0.08 + scrollN * 0.2;

          shell.rotation.y = -t * 0.15;
          shell.rotation.z = t * 0.06;

          core.rotation.y = -t * 0.05;

          dust.rotation.y = t * 0.02;

          // Ease the camera toward the pointer rather than snapping to it.
          camera.position.x += (px * 0.9 - camera.position.x) * 0.045;
          camera.position.y += (py * 0.55 - camera.position.y) * 0.045;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        };
        raf = requestAnimationFrame(loop);

        cleanup = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          window.removeEventListener('pointermove', onPointer);
          window.removeEventListener('scroll', onScroll);
          document.removeEventListener('visibilitychange', onVis);
          renderer.domElement.removeEventListener('webglcontextlost', onLost);
          renderer.domElement.removeEventListener('webglcontextrestored', onRestored);

          coreGeo.dispose();
          coreMat.dispose();
          shellWire.dispose();
          shellMat.dispose();
          latticeGeo.dispose();
          latticeMat.dispose();
          edgeGeo.dispose();
          edgeMat.dispose();
          dustGeo.dispose();
          dustMat.dispose();
          renderer.dispose();

          renderer.domElement.parentNode?.removeChild(renderer.domElement);
        };
      })
      .catch(() => {
        /* three.js failed to load — the CSS backdrop stands on its own. */
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} aria-hidden />;
}
