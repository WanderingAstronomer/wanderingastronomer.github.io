<script>
  import { onMount } from 'svelte';

  let canvas;
  let ctx;
  let stars = [];
  let shootingStars = [];
  let animId;
  let w = 0;
  let h = 0;

  const STAR_COUNT = 280;
  const SHOOTING_STAR_CHANCE = 0.002;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createStar() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: rand(0.3, 1.8),
      opacity: rand(0.15, 0.7),
      twinkleSpeed: rand(0.003, 0.015),
      twinkleOffset: Math.random() * Math.PI * 2,
      drift: rand(-0.02, 0.02),
    };
  }

  function createShootingStar() {
    const angle = rand(0.3, 0.8);
    const speed = rand(8, 16);
    return {
      x: rand(-100, w * 0.7),
      y: rand(-50, h * 0.3),
      length: rand(60, 140),
      speed,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      opacity: 1,
      decay: rand(0.012, 0.025),
      width: rand(1, 2),
    };
  }

  function resize() {
    if (!canvas) return;
    w = canvas.parentElement?.clientWidth || window.innerWidth;
    h = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx?.scale(devicePixelRatio, devicePixelRatio);
    stars = Array.from({ length: STAR_COUNT }, createStar);
  }

  function draw(time) {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    // Draw nebula glow
    const gradient = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, w * 0.5);
    gradient.addColorStop(0, 'rgba(0, 217, 255, 0.015)');
    gradient.addColorStop(0.5, 'rgba(0, 100, 200, 0.008)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Warm nebula
    const gradient2 = ctx.createRadialGradient(w * 0.2, h * 0.7, 0, w * 0.2, h * 0.7, w * 0.4);
    gradient2.addColorStop(0, 'rgba(255, 157, 61, 0.008)');
    gradient2.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, w, h);

    // Stars
    for (const star of stars) {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
      const alpha = star.opacity + twinkle * 0.2;
      if (alpha <= 0) continue;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 235, 255, ${Math.max(0, alpha)})`;
      ctx.fill();

      // Subtle glow on brighter stars
      if (star.size > 1.2) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 225, 255, ${alpha * 0.06})`;
        ctx.fill();
      }

      star.x += star.drift;
      if (star.x > w + 5) star.x = -5;
      if (star.x < -5) star.x = w + 5;
    }

    // Shooting stars
    if (Math.random() < SHOOTING_STAR_CHANCE) {
      shootingStars.push(createShootingStar());
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      const tailX = s.x - (s.dx / s.speed) * s.length;
      const tailY = s.y - (s.dy / s.speed) * s.length;

      const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
      grad.addColorStop(0.4, `rgba(200, 230, 255, ${s.opacity * 0.4})`);
      grad.addColorStop(1, 'rgba(200, 230, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.stroke();

      s.x += s.dx;
      s.y += s.dy;
      s.opacity -= s.decay;

      if (s.opacity <= 0 || s.x > w + 200 || s.y > h + 200) {
        shootingStars.splice(i, 1);
      }
    }

    animId = requestAnimationFrame(draw);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    animId = requestAnimationFrame(draw);

    const resizeHandler = () => {
      resize();
    };
    window.addEventListener('resize', resizeHandler, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeHandler);
    };
  });
</script>

<canvas bind:this={canvas} class="starfield"></canvas>

<style>
  .starfield {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
</style>
