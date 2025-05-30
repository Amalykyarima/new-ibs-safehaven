import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  totalTime = 60;
  remainingTime: number = this.totalTime; // time left in seconds
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription!: Subscription;
  @Output() hideTimer: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    const timer$ = interval(1000).pipe(
      take(this.totalTime) // Limit the stream to 300 emissions (5 minutes)
    );

    this.timerSubscription = timer$.subscribe((elapsedSeconds) => {
      this.remainingTime = this.totalTime - elapsedSeconds;
      this.minutes = Math.floor(this.remainingTime / 60);
      this.seconds = this.remainingTime % 60;
      // console.log('this.minutes, this.seconds', this.seconds);
      if (this.minutes < 1 && this.seconds <= 1)
        this.hideTimer.emit('hideTimer');
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      // console.log('elapse');
      this.hideTimer.emit('hideTimer');
    }
  }
}
