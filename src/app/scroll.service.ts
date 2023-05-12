import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPositionSubject = new BehaviorSubject<number>(0);
  public scrollPosition$ = this.scrollPositionSubject.asObservable();
  
  constructor() { }

  public setScrollPosition(scrollPosition: number): void {
    this.scrollPositionSubject.next(scrollPosition);
  }

  public getScrollPosition(): number {
    return this.scrollPositionSubject.value;
  }
}
