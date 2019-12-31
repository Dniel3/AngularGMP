import { Injectable} from '@angular/core';
import { OverlayRef,  Overlay } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private readonly loaderSubject = new Subject<LoaderState>();
  readonly loaderState$ = this.loaderSubject.asObservable();

  show() {
    this.loaderSubject.next(<LoaderState> {
      show: true
    });
  }

  hide() {
    this.loaderSubject.next(<LoaderState> {
      show: false
    });
  }
}
