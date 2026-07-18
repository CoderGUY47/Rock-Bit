"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const ThreeGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 240;
    const height = containerRef.current.clientHeight || 240;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. OrbitControls (allows user to grab, rotate, and interact with the globe)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom to maintain layout spacing
    controls.rotateSpeed = 0.8;

    // 3. Create Sphere Geometry
    const geometry = new THREE.SphereGeometry(2.1, 64, 64);

    // 4. Load a realistic Earth texture
    const textureLoader = new THREE.TextureLoader();
    let mesh: THREE.Mesh | null = null;

    // Use a reliable, high-resolution earth texture
    const earthTextureUrl = "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";

    textureLoader.load(
      earthTextureUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.9,
          metalness: 0.1,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = -Math.PI / 2; // Initial rotation
        scene.add(mesh);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Error loading Earth texture:", err);
        setError("Failed to load globe texture");
        setLoading(false);
      }
    );

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      // Auto-rotate the globe slowly
      if (mesh) {
        mesh.rotation.y += 0.0025;
      }
      
      // Update OrbitControls
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      controls.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading state indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 text-xs font-semibold">
          {error}
        </div>
      )}
    </div>
  );
};

export default ThreeGlobe;
