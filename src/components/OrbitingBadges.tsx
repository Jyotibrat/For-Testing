import { useRef, useEffect } from "react";
import * as THREE from "three";

const OrbitingBadges = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const badgeData = [
      { type: "golden-kitty", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-day-1", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-day-2", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-day-3", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-month-1", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-month-2", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-month-3", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-week-1", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-week-2", radius: 4.0, speed: 0.007 },
      { type: "product-of-the-week-3", radius: 4.0, speed: 0.007 },
    ];

    const fadeSpeed = 0.15;
    const offsetX = 0.3;

    function createBadgeSprite(type: string): THREE.Sprite {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = 256;
      canvas.height = 64;

      // Create a temporary div to render the badge
      const tempDiv = document.createElement("div");
      tempDiv.style.width = "256px";
      tempDiv.style.height = "64px";
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      document.body.appendChild(tempDiv);

      // Create a new instance of AwardBadge
      const badge = document.createElement("div");
      badge.innerHTML = `
        <svg width="256" height="64" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="badge-bg" x1="0" y1="0" x2="200" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b156e" />
              <stop offset="0.6" stopColor="#3b156e" />
              <stop offset="1" stopColor="#F13024" />
            </linearGradient>
            <linearGradient id="shine" x1="0" y1="0" x2="200" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0.2" stopColor="#fff" stopOpacity="0.0" />
              <stop offset="0.4" stopColor="#fff" stopOpacity="0.25" />
              <stop offset="0.6" stopColor="#fff" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="196" height="56" rx="14" fill="url(#badge-bg)" />
          <rect x="2" y="2" width="196" height="56" rx="14" fill="none" stroke="#F13024" strokeWidth="4" />
          <rect x="2" y="2" width="196" height="56" rx="14" fill="url(#shine)" />
          <g transform="translate(18, 30) scale(1.1) translate(-16, -16)">
            <path d="M14.963 9.075c.787-3-.188-5.887-.188-5.887S12.488 5.175 11.7 8.175c-.787 3 .188 5.887.188 5.887s2.25-1.987 3.075-4.987m-4.5 1.987c.787 3-.188 5.888-.188 5.888S7.988 14.962 7.2 11.962c-.787-3 .188-5.887.188-5.887s2.287 1.987 3.075 4.987m.862 10.388s-.6-2.962-2.775-5.175C6.337 14.1 3.375 13.5 3.375 13.5s.6 2.962 2.775 5.175c2.213 2.175 5.175 2.775 5.175 2.775m3.3 3.413s-1.988-2.288-4.988-3.075-5.887.187-5.887.187 1.987 2.287 4.988 3.075c3 .787 5.887-.188 5.887-.188Zm6.75 0s1.988-2.288 4.988-3.075c3-.826 5.887.187 5.887.187s-1.988 2.287-4.988 3.075c-3 .787-5.887-.188-5.887-.188ZM32.625 13.5s-2.963.6-5.175 2.775c-2.213 2.213-2.775 5.175-2.775 5.175s2.962-.6 5.175-2.775c2.175-2.213 2.775-5.175 2.775-5.175M28.65 6.075s.975 2.887.188 5.887c-.826 3-3.076 4.988-3.076 4.988s-.974-2.888-.187-5.888c.788-3 3.075-4.987 3.075-4.987m-4.5 7.987s.975-2.887.188-5.887c-.788-3-3.076-4.988-3.076-4.988s-.974 2.888-.187 5.888c.788 3 3.075 4.988 3.075 4.988ZM18 26.1c.975-.225 3.113-.6 5.325 0 3 .788 5.063 3.038 5.063 3.038s-2.888.975-5.888.187a13 13 0 0 1-1.425-.525c.563.788 1.125 1.425 2.288 1.913l-.863 2.062c-2.063-.862-2.925-2.137-3.675-3.262-.262-.375-.525-.713-.787-1.05-.26.293-.465.586-.686.903l-.102.147-.048.068c-.775 1.108-1.643 2.35-3.627 3.194l-.862-2.062c1.162-.488 1.725-1.125 2.287-1.913-.45.225-.938.375-1.425.525-3 .788-5.887-.187-5.887-.187s1.987-2.288 4.987-3.075c2.212-.563 4.35-.188 5.325.037" fill="#F13024" />
          </g>
          <text x="48" y="24" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#F13024">CERTIFICATION</text>
          <text x="48" y="48" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#fff">${
            type === "golden-kitty"
              ? "IBM"
              : type === "product-of-the-day-1"
              ? "Google"
              : type === "product-of-the-day-2"
              ? "Coursera"
              : type === "product-of-the-day-3"
              ? "AWS"
              : type === "product-of-the-month-1"
              ? "Cursa"
              : type === "product-of-the-month-2"
              ? "CodeChef"
              : type === "product-of-the-month-3"
              ? "Hackerrank"
              : type === "product-of-the-week-1"
              ? "NPTEL"
              : type === "product-of-the-week-2"
              ? "Kaggle"
              : "PMI"
          }</text>
        </svg>
      `;
      tempDiv.appendChild(badge);

      // Convert the SVG to a data URL
      const svgData = new XMLSerializer().serializeToString(
        badge.querySelector("svg")!
      );
      const img = new Image();
      img.src = "data:image/svg+xml;base64," + btoa(svgData);

      // Draw the image to the canvas
      context.drawImage(img, 0, 0, 256, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(1.5, 0.5, 1);

      // Clean up
      document.body.removeChild(tempDiv);

      return sprite;
    }

    const badges = badgeData.map((data, i) => {
      const badge = createBadgeSprite(data.type);
      scene.add(badge);

      return {
        mesh: badge,
        material: badge.material as THREE.SpriteMaterial,
        angle: (i / badgeData.length) * Math.PI * 2,
        radius: data.radius,
        speed: data.speed,
        visible: true,
      };
    });

    const animate = () => {
      requestAnimationFrame(animate);

      badges.forEach((b) => {
        b.angle += b.speed;
        const baseX = b.radius * Math.cos(b.angle);
        const z = b.radius * Math.sin(b.angle);

        // Fade in starts at the edge of the globe
        const fadeInStart = -0.2;
        const fadeInEnd = 0.2;
        const fadeOutStart = 0.2;
        const fadeOutEnd = -0.2;

        if (z > fadeInEnd) {
          // Fully visible
          b.material.opacity = 1;
          b.mesh.position.x = baseX;
        } else if (z > fadeInStart) {
          // Fading in
          const fadeProgress = (z - fadeInStart) / (fadeInEnd - fadeInStart);
          b.material.opacity = Math.min(fadeProgress, 1);
          b.mesh.position.x = baseX - offsetX * (1 - b.material.opacity);
        } else if (z > fadeOutEnd) {
          // Fading out
          const fadeProgress = (z - fadeOutEnd) / (fadeOutStart - fadeOutEnd);
          b.material.opacity = Math.max(fadeProgress, 0);
          b.mesh.position.x = baseX + offsetX * (1 - b.material.opacity);
        } else {
          // Fully hidden
          b.material.opacity = 0;
          b.mesh.position.x = baseX + offsetX;
        }

        b.mesh.position.z = z;
        b.mesh.position.y = 0;
        b.mesh.lookAt(camera.position);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ width: "155%", height: "140%", left: "-30%", top: "-20%" }}
      ref={mountRef}
    />
  );
};

export default OrbitingBadges;
