/**
 * Typewriter Effect Module
 */
export class Typewriter {
  constructor(elementId, content, options = {}) {
    this.element = document.getElementById(elementId);
    this.content = content;
    this.speed = options.speed || 10;
    this.delay = options.delay || 300;
    this.charIndex = 0;
    this.onComplete = options.onComplete || null;
  }
  
  type() {
    if (this.charIndex < this.content.length) {
      this.element.textContent = this.content.substring(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.type(), this.speed);
    } else if (this.onComplete) {
      this.onComplete();
    }
  }
  
  start() {
    setTimeout(() => this.type(), this.delay);
  }
  
  reset() {
    this.charIndex = 0;
    this.element.textContent = '';
  }
}
