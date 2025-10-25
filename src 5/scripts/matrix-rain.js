/**
 * Matrix Rain Effect
 */
export class MatrixRain {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.drops = [];
    this.chars = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ01MATRIXCODEZ'.split('');
    this.fontSize = 16;
    this.init();
  }
  
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    const columns = this.canvas.width / this.fontSize;
    for (let i = 0; i < columns; i++) {
      this.drops[i] = Math.random() * this.canvas.height / this.fontSize;
    }
    
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      const newColumns = this.canvas.width / this.fontSize;
      this.drops = [];
      for (let i = 0; i < newColumns; i++) {
        this.drops[i] = Math.random() * this.canvas.height / this.fontSize;
      }
    });
  }
  
  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#0F0';
    this.ctx.font = `${this.fontSize}px monospace`;
    
    for (let i = 0; i < this.drops.length; i++) {
      const char = this.chars[Math.floor(Math.random() * this.chars.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;
      
      this.ctx.fillText(char, x, y);
      
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      
      this.drops[i]++;
    }
  }
  
  start() {
    setInterval(() => this.draw(), 35);
  }
}
