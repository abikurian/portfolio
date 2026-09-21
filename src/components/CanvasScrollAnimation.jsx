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
    const images = [];
    const currentFrame = index => (
      `/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`
    );

    const getBestAvailableImage = (targetIndex) => {
      if (images[targetIndex] && images[targetIndex].complete && images[targetIndex].naturalWidth > 0) {
        return images[targetIndex];
      }
      for (let offset = 1; offset < frameCount; offset++) {
        const prev = targetIndex - offset;
        if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
          return images[prev];
        }
        const next = targetIndex + offset;
        if (next < frameCount && images[next] && images[next].complete && images[next].naturalWidth > 0) {
          return images[next];
        }
      }
      return null;
    };

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const imgUrl = currentFrame(i);
        img.onload = () => {
          if (i === 0) handleScroll();
        };
        img.onerror = () => console.error(`Failed to load image at: ${imgUrl}`);
        img.src = imgUrl;
        images.push(img);
      }
    };

    preloadImages();

    const renderImage = (img) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

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
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollDistance = window.innerWidth < 768 ? window.innerHeight * 1.5 : window.innerHeight * 2.5;
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / scrollDistance));

      targetFrame = scrollFraction * (frameCount - 1);

      if (canvas && noiseRef.current) {
        if (scrollTop > scrollDistance) {
          const transitionDistance = 300;
          const transitionPhase = Math.max(0, Math.min(1, (scrollTop - scrollDistance) / transitionDistance));
          const brightnessAmount = 100 - (transitionPhase * 60);

          canvas.style.filter = `brightness(${brightnessAmount}%)`;
          canvas.style.opacity = '1';
          noiseRef.current.style.opacity = (transitionPhase * 0.6).toString();
        } else {
          canvas.style.filter = 'brightness(100%)';
          canvas.style.opacity = '1';
          noiseRef.current.style.opacity = '0';
        }
      }
    };

    const tick = () => {
      currentRenderedFrame += (targetFrame - currentRenderedFrame) * 0.15;

      if (Math.abs(targetFrame - currentRenderedFrame) < 0.01) {
        currentRenderedFrame = targetFrame;
      }

      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.round(currentRenderedFrame)));
      const bestImg = getBestAvailableImage(frameIndex);
      if (bestImg) {
        renderImage(bestImg);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();
    handleScroll();

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
