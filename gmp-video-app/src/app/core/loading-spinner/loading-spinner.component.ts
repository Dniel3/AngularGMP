import { Component } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';


@Component({
  selector: 'gmp-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  constructor(readonly loaderService: LoadingSpinnerService) { }
}
