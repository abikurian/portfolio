import React, { useEffect, useRef } from 'react';

export default function CanvasScrollAnimation() {
  const canvasRef = useRef(null);
  const noiseRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 60;
    const currentFrame = index => (
      `/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`
    );

    const images = [];
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const imgUrl = currentFrame(i);
        img.src = imgUrl;
        img.onerror = () => console.error(`Failed to find image at: ${imgUrl}`);
        if (i === 0) img.onload = () => console.log(`Successfully loaded first frame: ${imgUrl}`);
        images.push(img);
      }
    };

    preloadImages();

    const renderImage = (img) => {
      if (!img || !img.complete) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let x = 0;
      let y = 0;

      if (canvasRatio > imgRatio) {
        renderHeight = canvas.width / imgRatio;
        y = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        x = (canvas.width - renderWidth) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, renderWidth, renderHeight);
    };

    let targetFrame = 0;
    let currentRenderedFrame = 0;
    let animationFrameId;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // Adjusted scroll pacing: animation completes earlier to allow "breathable" final state
      const scrollDistance = window.innerWidth < 768 ? window.innerHeight * 0.7 : window.innerHeight * 1.0;
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / scrollDistance));

      // Calculate target frame
      targetFrame = scrollFraction * (frameCount - 1);

      // Brutalist transition: cinematic dark color grade and grain
      if (canvas && noiseRef.current) {
        if (scrollTop > scrollDistance) {
          // Transition phase: 300px
          const transitionDistance = 300;
          const transitionPhase = Math.max(0, Math.min(1, (scrollTop - scrollDistance) / transitionDistance));

          // Brightness 100% -> 40%
          const brightnessAmount = 100 - (transitionPhase * 60);

          canvas.style.filter = `brightness(${brightnessAmount}%)`;
          canvas.style.opacity = '1';

          // Noise intensifies to 0.6 threshold
          noiseRef.current.style.opacity = (transitionPhase * 0.6).toString();
        } else {
          canvas.style.filter = 'brightness(100%)';
          canvas.style.opacity = '1';
          noiseRef.current.style.opacity = '0';
        }
      }
    };

    // Smooth scrubbing tick loop
    const tick = () => {
      // Linear interpolation for smoothing frame playback
      currentRenderedFrame += (targetFrame - currentRenderedFrame) * 0.15;

      if (Math.abs(targetFrame - currentRenderedFrame) < 0.01) {
        currentRenderedFrame = targetFrame;
      }

      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.round(currentRenderedFrame)));
      if (images[frameIndex]) {
        renderImage(images[frameIndex]);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Initialize default states
    if (images[0]) {
      images[0].onload = () => {
        renderImage(images[0]);
        handleScroll();
      };
    } else {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-black">
      <div
        ref={noiseRef}
        className="absolute inset-0 mix-blend-overlay opacity-0 z-10 pointer-events-none transition-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none transition-none"
        style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
      />
    </div>
  );
}
