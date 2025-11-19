import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';


@Directive({selector: '[animateOnScroll]'})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
private observer!: IntersectionObserver;
@Input() rootMargin = '0px 0px -10% 0px';


constructor(private el: ElementRef, private renderer: Renderer2) {}


ngOnInit(): void {
this.observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
this.renderer.addClass(this.el.nativeElement, 'show');
// if you want the animation to run only once, unobserve after first intersect
this.observer.unobserve(this.el.nativeElement);
}
});
}, { root: null, rootMargin: this.rootMargin, threshold: 0.12 });


this.observer.observe(this.el.nativeElement);
}


ngOnDestroy(): void {
if (this.observer) this.observer.disconnect();
}
}