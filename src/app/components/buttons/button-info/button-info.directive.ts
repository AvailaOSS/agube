import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonInfo]'
})
export class ButtonInfoDirective {
  constructor(private renderer: Renderer2, hostElement: ElementRef) {
    renderer.setAttribute(hostElement.nativeElement, 'type', 'button');
    renderer.addClass(hostElement.nativeElement, 'btn');
    renderer.addClass(hostElement.nativeElement, 'btn-outline-info');
  }
}
