import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { LogoComponent } from './logo/logo.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay'
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumComponent,
    LogoComponent,
    NotFoundPageComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    MatProgressSpinnerModule,
    OverlayModule,
    TranslateModule,
  ],
  exports: [HeaderComponent, FooterComponent, BreadcrumComponent, LoadingSpinnerComponent],
})
export class CoreModule { }
