// Welcome Animation logic (Clean 700ms vector reveal)
window.addEventListener('load', () => {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    if (welcomeOverlay) {
        setTimeout(() => {
            welcomeOverlay.classList.add('hide');
        }, 700);
    }
});
setTimeout(() => {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    if (welcomeOverlay && !welcomeOverlay.classList.contains('hide')) {
        welcomeOverlay.classList.add('hide');
    }
}, 1400);

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('open');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Scroll Fade-in Animation (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // 3. Ultra-Smooth Interactive Hero Waves & Constellation Canvas
  const canvas = document.getElementById('heroWave');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    const heroSection = document.querySelector('.hero');

    // Interactive mouse tracking with spring physics
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isActive: false
    };

    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.isActive = true;
      });

      heroSection.addEventListener('mouseleave', () => {
        mouse.isActive = false;
        mouse.targetX = width * 0.5;
        mouse.targetY = height * 0.5;
      });

      heroSection.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
          const rect = heroSection.getBoundingClientRect();
          mouse.targetX = e.touches[0].clientX - rect.left;
          mouse.targetY = e.touches[0].clientY - rect.top;
          mouse.isActive = true;
        }
      }, { passive: true });
    }

    // Particle constellation system
    const particleCount = 42;
    const particles = [];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.2,
          baseAlpha: Math.random() * 0.45 + 0.25,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.45 ? '99, 102, 241' : '6, 182, 212' // Indigo or Cyan
        });
      }
    }

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      if (mouse.targetX < 0) {
        mouse.x = width * 0.5;
        mouse.y = height * 0.5;
        mouse.targetX = width * 0.5;
        mouse.targetY = height * 0.5;
      }
      initParticles();
    }

    window.addEventListener('resize', resize);
    resize();

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse toward target
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Draw glowing wave ribbons with volumetric gradients
      const waveConfigs = [
        { freq: 0.0016, amp: height * 0.16, speed: 0.0009, offset: 0, color: 'rgba(99, 102, 241, 0.26)', fill: 'rgba(99, 102, 241, 0.025)', width: 2.0 },
        { freq: 0.0022, amp: height * 0.20, speed: 0.0012, offset: 1.4, color: 'rgba(139, 92, 246, 0.20)', fill: 'rgba(139, 92, 246, 0.02)', width: 1.6 },
        { freq: 0.0013, amp: height * 0.18, speed: 0.0007, offset: 2.8, color: 'rgba(6, 182, 212, 0.22)', fill: 'rgba(6, 182, 212, 0.018)', width: 1.8 },
        { freq: 0.0028, amp: height * 0.14, speed: 0.0014, offset: 4.2, color: 'rgba(56, 189, 248, 0.16)', fill: null, width: 1.2 },
        { freq: 0.0019, amp: height * 0.24, speed: 0.0008, offset: 5.5, color: 'rgba(99, 102, 241, 0.14)', fill: null, width: 1.0 }
      ];

      waveConfigs.forEach(w => {
        ctx.beginPath();
        const baseY = height * 0.52;

        ctx.moveTo(0, baseY);
        for (let x = 0; x <= width; x += 4) {
          // Base sinusoidal wave
          let y = baseY + Math.sin(x * w.freq + time * w.speed + w.offset) * w.amp;
          // Harmonic wave interference
          y += Math.cos(x * w.freq * 0.5 + time * w.speed * 0.8 + w.offset) * (w.amp * 0.35);

          // Mouse proximity wave deflection (spring physics ripple)
          if (mouse.isActive) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const force = (1 - dist / 220) * 45;
              y += Math.sin(dist * 0.05 - time * 0.005) * force;
            }
          }

          ctx.lineTo(x, y);
        }

        if (w.fill) {
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          ctx.fillStyle = w.fill;
          ctx.fill();
        }

        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.width;
        ctx.stroke();
      });

      // 2. Draw particle constellation system
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gentle mouse repulsion
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const angle = Math.atan2(dy, dx);
            const repel = (1 - dist / 130) * 2;
            p.x += Math.cos(angle) * repel;
            p.y += Math.sin(angle) * repel;
          }
        }

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const connAlpha = (1 - dist / 110) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${connAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Draw particle node with pulsing glow
        const pulse = Math.sin(time * 0.003 + p.phase) * 0.25 + 0.75;
        const currentAlpha = p.baseAlpha * pulse;

        // Soft outer glow halo
        const haloGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        haloGradient.addColorStop(0, `rgba(${p.color}, ${currentAlpha * 0.7})`);
        haloGradient.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = haloGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 16;
      requestAnimationFrame(draw);
    }

    draw();
  }

  // Rotating Word in Hero Headline
  const rotatorWords = document.querySelectorAll('.text-rotator .word');
  if (rotatorWords.length > 1) {
    let currentIdx = 0;
    setInterval(() => {
      const currentWord = rotatorWords[currentIdx];
      currentWord.classList.remove('active');
      currentWord.classList.add('leaving');

      currentIdx = (currentIdx + 1) % rotatorWords.length;
      const nextWord = rotatorWords[currentIdx];
      nextWord.classList.remove('leaving');
      nextWord.classList.add('active');

      setTimeout(() => {
        currentWord.classList.remove('leaving');
      }, 600);
    }, 2800);
  }

  // 4. Scroll to Top Button
  const scrollBtn = document.getElementById('scrollToTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Image Security (Anti-Scraping)
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // 6. Interactive Project Estimator
  const estTypes = document.querySelectorAll('.est-type');
  const estScopes = document.querySelectorAll('.est-scope');
  const estTimeline = document.getElementById('estTimeline');
  const estCta = document.getElementById('estCta');

  if (estTypes.length && estScopes.length && estTimeline && estCta) {
    let currentType = 'Web Development';
    let currentScope = 'Growth / Scalable';

    const matrix = {
      'Web Development': { 'MVP / Startup': '2 - 3 Weeks', 'Growth / Scalable': '4 - 6 Weeks', 'Enterprise Suite': '8 - 12 Weeks' },
      'Mobile App': { 'MVP / Startup': '4 - 6 Weeks', 'Growth / Scalable': '6 - 10 Weeks', 'Enterprise Suite': '12 - 16 Weeks' },
      'ERP System': { 'MVP / Startup': '6 - 8 Weeks', 'Growth / Scalable': '10 - 14 Weeks', 'Enterprise Suite': '16 - 24 Weeks' },
      'Custom CRM': { 'MVP / Startup': '3 - 5 Weeks', 'Growth / Scalable': '6 - 8 Weeks', 'Enterprise Suite': '10 - 14 Weeks' },
      'E-Commerce': { 'MVP / Startup': '3 - 4 Weeks', 'Growth / Scalable': '5 - 8 Weeks', 'Enterprise Suite': '10 - 14 Weeks' },
      'Digital Marketing': { 'MVP / Startup': 'Ongoing (Sprint)', 'Growth / Scalable': 'Monthly Growth', 'Enterprise Suite': 'Quarterly Retainer' }
    };

    function updateEstimate() {
      const time = (matrix[currentType] && matrix[currentType][currentScope]) || '4 - 6 Weeks';
      estTimeline.textContent = time;
      const msg = encodeURIComponent(`Hi Nova's Technology! I used your project calculator. I need: ${currentType} (${currentScope}). Estimated timeline is ${time}. Please share your proposal.`);
      estCta.href = `https://wa.me/917383320403?text=${msg}`;
    }

    estTypes.forEach(btn => {
      btn.addEventListener('click', () => {
        estTypes.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.getAttribute('data-type');
        updateEstimate();
      });
    });

    estScopes.forEach(btn => {
      btn.addEventListener('click', () => {
        estScopes.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentScope = btn.getAttribute('data-scope');
        updateEstimate();
      });
    });

    updateEstimate();
  }

  // 7. Contact Form (AJAX submit to Web3Forms, no page redirect)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const accessKey = contactForm.querySelector('input[name="access_key"]').value;
      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        formStatus.textContent = 'Form is not yet configured. Please contact us by phone or email instead.';
        formStatus.style.color = '#EF4444';
        return;
      }

      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.textContent = '';

      try {
        const formData = new FormData(contactForm);
        // Note: no custom headers here - adding e.g. Accept triggers a CORS
        // preflight that Web3Forms' API does not answer, which silently
        // breaks the submission in real browsers.
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (response.ok && result.success) {
          formStatus.textContent = "Thank you! Your message has been sent. We'll get back to you within 2 hours.";
          formStatus.style.color = '#10B981';
          contactForm.reset();
        } else {
          formStatus.textContent = result.message || 'Something went wrong. Please try again or contact us directly.';
          formStatus.style.color = '#EF4444';
        }
      } catch (err) {
        formStatus.textContent = 'Network error. Please check your connection and try again.';
        formStatus.style.color = '#EF4444';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

  // 8. Highlight Active Nav Link based on URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

});
