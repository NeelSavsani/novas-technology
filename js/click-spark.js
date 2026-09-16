/**
 * ClickSpark Component - Vanilla JS implementation
 * Converted from React Bits: https://reactbits.dev/
 */

class ClickSpark {
  constructor(options = {}) {
    this.sparkColor = options.sparkColor || '#6366F1';
    this.sparkSize = options.sparkSize || 10;
    this.sparkRadius = options.sparkRadius || 15;
    this.sparkCount = options.sparkCount || 8;
    this.duration = options.duration || 400;
    this.easing = options.easing || 'ease-out';
    this.extraScale = options.extraScale || 1.0;
    
    this.sparks = [];
    this.startTime = null;
    this.animationId = null;

    this.initCanvas();
    this.bindEvents();
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '99999';
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    this.resizeHandler = () => this.resizeCanvas();
    window.addEventListener('resize', this.resizeHandler);

    this.clickHandler = (e) => this.handleClick(e);
    document.addEventListener('click', this.clickHandler);
  }

  easeFunc(t) {
    switch (this.easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:
        return t * (2 - t);
    }
  }

  handleClick(e) {
    const x = e.clientX;
    const y = e.clientY;

    const now = performance.now();
    for (let i = 0; i < this.sparkCount; i++) {
      this.sparks.push({
        x,
        y,
        angle: (2 * Math.PI * i) / this.sparkCount,
        startTime: now
      });
    }

    if (!this.animationId) {
      this.draw();
    }
  }

  draw(timestamp = performance.now()) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.sparks = this.sparks.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= this.duration) {
        return false;
      }

      const progress = elapsed / this.duration;
      const eased = this.easeFunc(progress);

      const distance = eased * this.sparkRadius * this.extraScale;
      const lineLength = this.sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      this.ctx.strokeStyle = this.sparkColor;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();

      return true;
    });

    if (this.sparks.length > 0) {
      this.animationId = requestAnimationFrame((ts) => this.draw(ts));
    } else {
      this.animationId = null;
    }
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('click', this.clickHandler);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new ClickSpark({
    sparkColor: '#6366F1', // Matches the site's var(--accent) color
    sparkSize: 10,
    sparkRadius: 15,
    sparkCount: 8,
    duration: 400
  });
});
