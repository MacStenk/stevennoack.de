/**
 * Typewriter Effect Module
 * @description Animated typing effect for text content
 * @reusable
 */

export class Typewriter {
  constructor(elementId, content, options = {}) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;
    
    this.content = content;
    this.speed = options.speed || 10;
    this.delay = options.delay || 300;
    this.charIndex = 0;
    this.isRunning = false;
    this.onComplete = options.onComplete || null;
  }
  
  type() {
    if (!this.element) return;
    
    if (this.charIndex < this.content.length) {
      this.element.textContent = this.content.substring(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.type(), this.speed);
    } else {
      this.isRunning = false;
      if (this.onComplete) {
        this.onComplete();
      }
    }
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    setTimeout(() => this.type(), this.delay);
  }
  
  reset() {
    this.charIndex = 0;
    this.isRunning = false;
    if (this.element) {
      this.element.textContent = '';
    }
  }
  
  restart() {
    this.reset();
    this.start();
  }
}

export default Typewriter;
