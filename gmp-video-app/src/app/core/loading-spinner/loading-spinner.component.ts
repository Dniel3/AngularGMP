import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingSpinnerService, LoaderState } from 'src/app/services/loading-spinner.service';
import { map } from 'rxjs/operators';



@Component({
  selector: 'gmp-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  readonly show$: Observable<boolean>;

  constructor(private readonly loaderService: LoadingSpinnerService) {
    this.show$ = this.loaderService.loaderState$.pipe(
    map((state: LoaderState) => state.show ));
  }
}
