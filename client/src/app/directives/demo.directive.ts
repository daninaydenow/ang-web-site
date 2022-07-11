import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDemo]'
})
export class DemoDirective {

  constructor(private el: ElementRef) { }


  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.height = '350px';
    // this.el.nativeElement.style.objectFit = 'cover'
    
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.height = '200px';
    // this.el.nativeElement.style.objectFit = 'contain'
  }

}
