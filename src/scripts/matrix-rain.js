/**
 * Matrix Rain Effect
 * @description Animated Matrix-style falling characters background
 * @reusable
 */

export class MatrixRain {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.chars = options.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    this.fontSize = options.fontSize || 14;
    this.drops = [];
    this.columns = 0;
    this.intervalId = null;
    
    this.init();
  }
  
  init() {
    // Set canvas size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Calculate columns
    this.columns = this.canvas.width / this.fontSize;
    
    // Initialize drops
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }
    
    // Handle resize
    window.addEventListener('resize', () => this.handleResize());
  }
  
  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = this.canvas.width / this.fontSize;
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }
  }
  
  draw() {
    // Semi-transparent black to create fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Matrix green text
    this.ctx.fillStyle = '#00ff41';
    this.ctx.font = `${this.fontSize}px monospace`;
    
    // Draw characters
    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      
      // Reset drop randomly or when it reaches bottom
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      
      this.drops[i]++;
    }
  }
  
  start(interval = 35) {
    this.intervalId = setInterval(() => this.draw(), interval);
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export default MatrixRain;
