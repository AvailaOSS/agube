import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[autofocus]",
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    console.log("HELLO!")
    this.elementRef.nativeElement.focus();
  }
}
