import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit, OnDestroy {
  @Input() appHighlight: string = '';
  @Input() highlightColor: string = '#ffff99';
  
  private originalText: string = '';
  private observer: MutationObserver | null = null;
  
  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    this.highlightText();
    this.setupObserver();
  }
  
  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  private highlightText() {
    if (!this.appHighlight || !this.el.nativeElement.textContent) {
      return;
    }
    
    const text = this.el.nativeElement.textContent;
    const searchTerm = this.appHighlight.toLowerCase();
    const regex = new RegExp(`(${this.escapeRegExp(searchTerm)})`, 'gi');
    
    if (regex.test(text)) {
      this.originalText = text;
      const highlightedText = text.replace(regex, `<span style="background-color: ${this.highlightColor}">$1</span>`);
      this.el.nativeElement.innerHTML = highlightedText;
    }
  }
  
  private setupObserver() {
    // Watch for changes in the element's content
    this.observer = new MutationObserver(() => {
      if (this.el.nativeElement.textContent !== this.originalText) {
        this.highlightText();
      }
    });
    
    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
  
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
} 