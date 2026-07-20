"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ChatBot3DProps {
  width?: number;
  height?: number;
  interactive?: boolean;
}

export const ChatBot3D: React.FC<ChatBot3DProps> = ({
  width = 150,
  height = 150,
  interactive = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Explicitly style canvas element to center it in absolute layout coordinates
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lights - Super bright front lighting to eliminate any dark shading/shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 3.6);
    scene.add(ambientLight);

    // Front-facing photographer key light
    const frontLight = new THREE.DirectionalLight(0xffffff, 4.0);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.5);
    backLight.position.set(-5, 3, -5);
    scene.add(backLight);

    // 3. GLTF Loader to load user's custom rock-bit-bot.glb
    const loader = new GLTFLoader();
    let botGroup: THREE.Group | null = null;

    loader.load(
      "/assets/models/rock-bit-bot.glb",
      (gltf) => {
        const model = gltf.scene;

        // Create a pivot group to act as the centered origin of rotation
        const pivot = new THREE.Group();
        scene.add(pivot);
        botGroup = pivot;

        // Force matrix update to get correct world coordinates
        model.updateMatrixWorld(true);

        // Auto-center using Three.js built-in Box3.setFromObject
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Shift model inside pivot group so its center is exactly at (0, 0, 0)
        model.position.set(-center.x, -center.y, -center.z);
        pivot.add(model);

        // Scale pivot group to fit inside the canvas view bounds nicely
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim; // Standard scale target
        pivot.scale.set(scale, scale, scale);

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Failed to load custom 3D model:", err);
        setLoading(false);
      }
    );

    // 4. Drag rotation interaction (Mouse & Touch)
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousPosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !botGroup) return;
      const deltaMove = {
        x: e.clientX - previousPosition.x,
        y: e.clientY - previousPosition.y,
      };

      botGroup.rotation.y += deltaMove.x * 0.015;
      botGroup.rotation.x += deltaMove.y * 0.015;

      previousPosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !botGroup) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousPosition.x,
        y: e.touches[0].clientY - previousPosition.y,
      };

      botGroup.rotation.y += deltaMove.x * 0.015;
      botGroup.rotation.x += deltaMove.y * 0.015;

      previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    if (interactive) {
      containerRef.current.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      
      containerRef.current.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    }

    // 5. Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (botGroup && !isDragging) {
        // Smooth gentle idle rotation/tilting
        botGroup.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.25;
        botGroup.rotation.x = Math.cos(clock.getElapsedTime() * 0.5) * 0.05;
        // Subtle floating effect
        botGroup.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (interactive) {
        containerRef.current?.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
      renderer.dispose();
    };
  }, [width, height, interactive]);

  return (
    <div className="relative flex items-center justify-center select-none overflow-hidden w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full relative overflow-visible cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default ChatBot3D;
