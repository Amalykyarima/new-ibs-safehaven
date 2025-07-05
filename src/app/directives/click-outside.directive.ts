import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { Subscription, filter, fromEvent } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside: any = new EventEmitter()
  documentClickSubscription: Subscription | undefined
  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) { }
  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, "click")
      .pipe(filter((event) => {
        return !this.isInside(event?.target as HTMLElement)
      })).subscribe(() => {
        
        this.clickOutside.emit()
      })
  }

  isInside(targetElement: HTMLElement): boolean {
    return targetElement === this.element.nativeElement || this.element.nativeElement.contains(targetElement)
  }

}
