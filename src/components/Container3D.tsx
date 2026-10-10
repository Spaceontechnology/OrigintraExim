import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Eye, 
  Maximize2, 
  Box, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Anchor,
  Truck,
  Ship,
  Layers,
  Thermometer
} from 'lucide-react';

interface Container3DProps {
  onOpenQuote?: () => void;
}

export const Container3D: React.FC<Container3DProps> = ({ onOpenQuote }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Interactive UI states
  const [animationMode, setAnimationMode] = useState<'move' | 'rotate' | 'open' | 'xray'>('move');
  const [activeSpiceCargo, setActiveSpiceCargo] = useState<'cardamom' | 'pepper' | 'turmeric' | 'chilli'>('cardamom');
  const [containerSize, setContainerSize] = useState<'20ft' | '40ft'>('20ft');
  const [isHovered, setIsHovered] = useState(false);

  // References to Three.js animated elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const containerGroupRef = useRef<THREE.Group | null>(null);
  const leftDoorRef = useRef<THREE.Group | null>(null);
  const rightDoorRef = useRef<THREE.Group | null>(null);
  const cargoGroupRef = useRef<THREE.Group | null>(null);
  const waterRef = useRef<THREE.Mesh | null>(null);
  const shipDeckRef = useRef<THREE.Group | null>(null);

  // Animation values
  const animStateRef = useRef({
    mode: 'move',
    doorProgress: 0,
    containerY: 0,
    containerX: 0,
    containerTilt: 0,
    wavePhase: 0,
    rotationY: -0.4,
    targetRotationY: -0.4,
    rotationX: 0.15,
    targetRotationX: 0.15,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    xray: false
  });

  // Keep state ref in sync with React state
  useEffect(() => {
    animStateRef.current.mode = animationMode;
  }, [animationMode]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0A1C3E'); // Deep oceanic navy to integrate with corporate theme

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 8.5);
    camera.lookAt(0, 0.5, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting (Sunlight + Ambient + Ocean bounce)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff6e5, 1.8);
    sunLight.position.set(6, 12, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    fillLight.position.set(-8, 4, -4);
    scene.add(fillLight);

    // 5. Procedural Textures for Container Corrugation & Decals
    const createCorrugationTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Base blue paint
      ctx.fillStyle = '#0070E0';
      ctx.fillRect(0, 0, 512, 512);

      // Draw corrugated steel vertical shadows
      const ridges = 32;
      const ridgeWidth = 512 / ridges;
      for (let i = 0; i < ridges; i++) {
        const x = i * ridgeWidth;
        const grad = ctx.createLinearGradient(x, 0, x + ridgeWidth, 0);
        grad.addColorStop(0, 'rgba(0, 40, 100, 0.45)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.25)');
        grad.addColorStop(0.7, 'rgba(0, 112, 224, 0.1)');
        grad.addColorStop(1, 'rgba(0, 20, 60, 0.6)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, ridgeWidth, 512);
      }

      // Add "ORIGINTRA EXIM" stenciled brand
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('ORIGINTRA EXIM', 60, 240);

      ctx.fillStyle = '#38BDF8';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('CONNECTING MARKETS. MOVING POSSIBILITIES.', 60, 275);

      // Stenciled container numbers
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('OTXU 829104 [5]', 60, 90);
      ctx.font = 'bold 16px monospace';
      ctx.fillText('22G1 • MAX GR. 30,480 KG', 60, 120);
      ctx.fillText('TARE 2,230 KG • NET 28,250 KG', 60, 145);

      // CSC Safety Approval Plate
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(360, 360, 110, 80);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(360, 360, 110, 80);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('CSC SAFETY', 375, 385);
      ctx.fillText('APPROVAL', 380, 405);
      ctx.fillText('SPICES BOARD', 370, 425);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const sideTexture = createCorrugationTexture();

    // 6. Build 3D Container Model
    const containerGroup = new THREE.Group();
    containerGroupRef.current = containerGroup;
    scene.add(containerGroup);

    // Dimensions for 20ft container (scaled 4:1)
    const length = 4.8;
    const widthC = 2.0;
    const heightC = 2.0;

    // Main Container Shell
    const containerMaterial = new THREE.MeshStandardMaterial({
      map: sideTexture,
      roughness: 0.35,
      metalness: 0.35,
      color: 0xffffff,
    });

    // Box body
    const bodyGeometry = new THREE.BoxGeometry(length, heightC, widthC);
    const bodyMesh = new THREE.Mesh(bodyGeometry, containerMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    containerGroup.add(bodyMesh);

    // Corner Castings (8 metallic blocks at corners)
    const cornerGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const cornerMat = new THREE.MeshStandardMaterial({ color: 0x0A1C3E, metalness: 0.8, roughness: 0.2 });

    const cornerPositions = [
      [length/2, heightC/2, widthC/2],
      [-length/2, heightC/2, widthC/2],
      [length/2, -heightC/2, widthC/2],
      [-length/2, -heightC/2, widthC/2],
      [length/2, heightC/2, -widthC/2],
      [-length/2, heightC/2, -widthC/2],
      [length/2, -heightC/2, -widthC/2],
      [-length/2, -heightC/2, -widthC/2],
    ];

    cornerPositions.forEach(([x, y, z]) => {
      const cMesh = new THREE.Mesh(cornerGeo, cornerMat);
      cMesh.position.set(x, y, z);
      containerGroup.add(cMesh);
    });

    // Container Steel Edge Rails
    const railMat = new THREE.MeshStandardMaterial({ color: 0x005CB8, metalness: 0.5, roughness: 0.3 });
    const topRailGeo = new THREE.BoxGeometry(length + 0.04, 0.08, 0.08);
    
    // Top rails
    const topRail1 = new THREE.Mesh(topRailGeo, railMat);
    topRail1.position.set(0, heightC/2, widthC/2);
    containerGroup.add(topRail1);

    const topRail2 = new THREE.Mesh(topRailGeo, railMat);
    topRail2.position.set(0, heightC/2, -widthC/2);
    containerGroup.add(topRail2);

    // Bottom rails
    const botRail1 = new THREE.Mesh(topRailGeo, railMat);
    botRail1.position.set(0, -heightC/2, widthC/2);
    containerGroup.add(botRail1);

    const botRail2 = new THREE.Mesh(topRailGeo, railMat);
    botRail2.position.set(0, -heightC/2, -widthC/2);
    containerGroup.add(botRail2);

    // 7. Interactive 3D Doors with Hinges & Locking Rods (Right End of Container)
    const doorWidth = widthC / 2 - 0.02;
    const doorHeight = heightC - 0.08;
    const doorGeo = new THREE.BoxGeometry(0.06, doorHeight, doorWidth);
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0x0070E0,
      metalness: 0.4,
      roughness: 0.3,
    });

    // Left Door Pivot Group
    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(length/2 + 0.02, 0, -widthC/2 + 0.02);
    const leftDoorMesh = new THREE.Mesh(doorGeo, doorMat);
    leftDoorMesh.position.set(0, 0, doorWidth / 2);
    leftDoorMesh.castShadow = true;
    leftDoorPivot.add(leftDoorMesh);

    // Locking Bars on left door
    const rodGeo = new THREE.CylinderGeometry(0.02, 0.02, doorHeight + 0.1, 12);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, metalness: 0.9, roughness: 0.1 });
    const rod1 = new THREE.Mesh(rodGeo, rodMat);
    rod1.position.set(0.04, 0, doorWidth * 0.3);
    leftDoorMesh.add(rod1);

    leftDoorRef.current = leftDoorPivot;
    containerGroup.add(leftDoorPivot);

    // Right Door Pivot Group
    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(length/2 + 0.02, 0, widthC/2 - 0.02);
    const rightDoorMesh = new THREE.Mesh(doorGeo, doorMat);
    rightDoorMesh.position.set(0, 0, -doorWidth / 2);
    rightDoorMesh.castShadow = true;
    rightDoorPivot.add(rightDoorMesh);

    const rod2 = new THREE.Mesh(rodGeo, rodMat);
    rod2.position.set(0.04, 0, -doorWidth * 0.3);
    rightDoorMesh.add(rod2);

    rightDoorRef.current = rightDoorPivot;
    containerGroup.add(rightDoorPivot);

    // 8. Internal Cargo (Export Spice Sacks Stacked Inside)
    const cargoGroup = new THREE.Group();
    cargoGroup.position.set(0.8, -0.6, 0);
    cargoGroupRef.current = cargoGroup;
    containerGroup.add(cargoGroup);

    // Spice Sacks
    const sackGeo = new THREE.BoxGeometry(0.65, 0.32, 0.45);
    const sackMat = new THREE.MeshStandardMaterial({
      color: 0xD4A373, // Jute burlap color
      roughness: 0.9,
      metalness: 0.05,
    });

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        for (let layer = 0; layer < 3; layer++) {
          const sack = new THREE.Mesh(sackGeo, sackMat);
          sack.position.set(
            (col - 1) * 0.7,
            layer * 0.34,
            (row - 1) * 0.48
          );
          sack.rotation.y = (Math.random() - 0.5) * 0.1;
          sack.castShadow = true;
          cargoGroup.add(sack);
        }
      }
    }

    // Cargo Moisture Sensor & Lashing Straps
    const sensorGeo = new THREE.BoxGeometry(0.2, 0.3, 0.1);
    const sensorMat = new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.2 });
    const sensorMesh = new THREE.Mesh(sensorGeo, sensorMat);
    sensorMesh.position.set(0.8, 0.5, 0.4);
    cargoGroup.add(sensorMesh);

    // 9. Ocean Vessel Deck & Sea Waves underneath
    const oceanGroup = new THREE.Group();
    scene.add(oceanGroup);

    // Vessel Container Deck Platform
    const deckGeo = new THREE.BoxGeometry(9, 0.4, 4.5);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.7,
      metalness: 0.5
    });
    const deckMesh = new THREE.Mesh(deckGeo, deckMat);
    deckMesh.position.set(0, -1.25, 0);
    deckMesh.receiveShadow = true;
    oceanGroup.add(deckMesh);
    shipDeckRef.current = oceanGroup;

    // Ocean Water Plane
    const waterGeo = new THREE.PlaneGeometry(35, 35, 48, 48);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x004588,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: false,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -1.8, 0);
    water.receiveShadow = true;
    oceanGroup.add(water);
    waterRef.current = water;

    // 10. Interactive Drag Handlers (Rotate 3D with Mouse / Touch)
    const onMouseDown = (e: MouseEvent) => {
      animStateRef.current.isDragging = true;
      animStateRef.current.prevMouseX = e.clientX;
      animStateRef.current.prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!animStateRef.current.isDragging) return;
      const deltaX = e.clientX - animStateRef.current.prevMouseX;
      const deltaY = e.clientY - animStateRef.current.prevMouseY;

      animStateRef.current.targetRotationY += deltaX * 0.008;
      animStateRef.current.targetRotationX += deltaY * 0.006;
      animStateRef.current.targetRotationX = Math.max(-0.4, Math.min(0.8, animStateRef.current.targetRotationX));

      animStateRef.current.prevMouseX = e.clientX;
      animStateRef.current.prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      animStateRef.current.isDragging = false;
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        animStateRef.current.isDragging = true;
        animStateRef.current.prevMouseX = e.touches[0].clientX;
        animStateRef.current.prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!animStateRef.current.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - animStateRef.current.prevMouseX;
      const deltaY = e.touches[0].clientY - animStateRef.current.prevMouseY;

      animStateRef.current.targetRotationY += deltaX * 0.008;
      animStateRef.current.targetRotationX += deltaY * 0.006;

      animStateRef.current.prevMouseX = e.touches[0].clientX;
      animStateRef.current.prevMouseY = e.touches[0].clientY;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    // 11. Animation Loop with 60 FPS Render
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const state = animStateRef.current;

      // Smooth camera / rotation interpolation
      state.rotationY += (state.targetRotationY - state.rotationY) * 0.08;
      state.rotationX += (state.targetRotationX - state.rotationX) * 0.08;

      if (containerGroupRef.current) {
        // Base positioning
        containerGroupRef.current.rotation.y = state.rotationY;
        containerGroupRef.current.rotation.x = state.rotationX;

        // Animate based on selected Mode:
        if (state.mode === 'move') {
          // Ocean sailing mode: gentle wave pitching, rolling, and forward surging
          const surge = Math.sin(elapsedTime * 1.5) * 0.25;
          const heave = Math.cos(elapsedTime * 2.0) * 0.08;
          const roll = Math.sin(elapsedTime * 1.2) * 0.04;
          const pitch = Math.cos(elapsedTime * 1.6) * 0.03;

          containerGroupRef.current.position.y = heave;
          containerGroupRef.current.position.x = surge * 0.5;
          containerGroupRef.current.rotation.z = roll;
          containerGroupRef.current.rotation.x = state.rotationX + pitch;

          // Water wave motion
          if (waterRef.current) {
            const pos = waterRef.current.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
              const u = pos.getX(i);
              const v = pos.getY(i);
              pos.setZ(i, Math.sin(u * 0.5 + elapsedTime * 2) * 0.15 + Math.cos(v * 0.5 + elapsedTime * 1.5) * 0.12);
            }
            pos.needsUpdate = true;
          }

          // Smoothly close doors if moving
          state.doorProgress += (0 - state.doorProgress) * 0.1;
        } 
        else if (state.mode === 'open') {
          // Target doors open to ~135 degrees
          state.doorProgress += (1 - state.doorProgress) * 0.08;
          containerGroupRef.current.position.set(0, 0, 0);
          containerGroupRef.current.rotation.z = 0;
          // Rotate slightly so user sees inside doors
          state.targetRotationY = 1.35;
          state.targetRotationX = 0.1;
        } 
        else if (state.mode === 'rotate') {
          // Continuous 360 degree turntable rotation
          state.targetRotationY += 0.012;
          state.doorProgress += (0.4 - state.doorProgress) * 0.08;
          containerGroupRef.current.position.set(0, 0, 0);
        }
        else if (state.mode === 'xray') {
          // X-Ray inspection view
          containerGroupRef.current.position.set(0, 0.2, 0);
        }

        // Apply door open angles
        if (leftDoorRef.current && rightDoorRef.current) {
          const maxAngle = Math.PI * 0.72; // ~130 deg
          leftDoorRef.current.rotation.y = -state.doorProgress * maxAngle;
          rightDoorRef.current.rotation.y = state.doorProgress * maxAngle;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.innerHTML = '';
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-16 bg-[#0A1C3E] text-white border-b border-slate-800 relative overflow-hidden">
      
      {/* Background nautical coordinates watermark */}
      <div className="absolute top-4 left-6 text-[10px] font-mono text-slate-500 opacity-40 select-none">
        LAT: 22° 50' 11" N | LON: 69° 42' 18" E • MUNDRA PORT GATEWAY CONTAINER LOGISTICS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-[#38BDF8] text-xs font-bold uppercase tracking-wider mb-2">
              <Ship className="w-3.5 h-3.5" />
              <span>3D Interactive Logistics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Containerized Freight in Motion
            </h2>
            <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-xl">
              Experience our maritime shipping container in 3D. Inspect internal cargo stowage, open rear doors, or rotate 360°.
            </p>
          </div>

          {/* Minimal Cargo Switcher */}
          <div className="flex items-center space-x-1.5 bg-[#142B55] p-1 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400 px-1.5 text-[11px]">Cargo:</span>
            {[
              { id: 'cardamom', label: 'Cardamom' },
              { id: 'pepper', label: 'Black Pepper' },
              { id: 'turmeric', label: 'Turmeric' },
              { id: 'chilli', label: 'Chilli' }
            ].map((spice) => (
              <button
                key={spice.id}
                onClick={() => setActiveSpiceCargo(spice.id as any)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  activeSpiceCargo === spice.id
                    ? 'bg-[#0070E0] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {spice.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Canvas Container Showcase Card */}
        <div className="relative rounded-2xl bg-[#07162C] border border-slate-700/80 shadow-2xl overflow-hidden">
          
          {/* Top Status Bar Over 3D Canvas */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            
            <div className="flex items-center space-x-2 bg-[#0A1C3E]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs shadow pointer-events-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono font-bold text-white">OTXU 829104 [5]</span>
              <span className="text-slate-400">|</span>
              <span className="text-[#38BDF8] font-mono text-[11px]">20' Standard Dry (22G1)</span>
            </div>

            {/* In-Container Telemetry Readout */}
            <div className="hidden sm:flex items-center space-x-3 bg-[#0A1C3E]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs font-mono shadow pointer-events-auto">
              <div className="flex items-center text-slate-300">
                <Thermometer className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                <span>Temp: <strong className="text-white">21.8°C</strong></span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="text-slate-300">
                Humidity: <strong className="text-[#38BDF8]">54% RH (Dry)</strong>
              </div>
            </div>

          </div>

          {/* Interactive Three.js WebGL Mount Canvas */}
          <div 
            ref={mountRef} 
            className="w-full h-[460px] sm:h-[500px] cursor-grab active:cursor-grabbing"
            title="Click and drag to rotate 3D container in any direction"
          />

          {/* Bottom Floating 3D Control Console */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-2 sm:gap-3 pointer-events-none">
            
            {/* Control Modes */}
            <div className="flex items-center space-x-1 sm:space-x-2 bg-[#0A1C3E]/95 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-slate-700 shadow-xl pointer-events-auto">
              <button
                onClick={() => setAnimationMode('move')}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold flex items-center space-x-1 sm:space-x-1.5 transition cursor-pointer ${
                  animationMode === 'move'
                    ? 'bg-[#0070E0] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Ship className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ocean Sail / Waves</span>
                <span className="sm:hidden">Sail</span>
              </button>

              <button
                onClick={() => setAnimationMode('open')}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold flex items-center space-x-1 sm:space-x-1.5 transition cursor-pointer ${
                  animationMode === 'open'
                    ? 'bg-[#0070E0] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Doors & Cargo</span>
                <span className="sm:hidden">Doors</span>
              </button>

              <button
                onClick={() => setAnimationMode('rotate')}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold flex items-center space-x-1 sm:space-x-1.5 transition cursor-pointer ${
                  animationMode === 'rotate'
                    ? 'bg-[#0070E0] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">360° Turntable</span>
                <span className="sm:hidden">360°</span>
              </button>
            </div>

            {/* Quick Action */}
            <div className="pointer-events-auto flex items-center space-x-2">
              <button
                onClick={onOpenQuote}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition flex items-center space-x-1 sm:space-x-1.5 cursor-pointer"
              >
                <span className="hidden sm:inline">Book This Container Cargo</span>
                <span className="sm:hidden">Book Cargo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-16 right-4 text-[11px] text-slate-400 font-mono bg-black/40 px-2.5 py-1 rounded backdrop-blur-xs pointer-events-none hidden md:block">
            💡 Drag with mouse to orbit 360°
          </div>

        </div>

      </div>
    </section>
  );
};
