import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { LogoComponent } from './logo/logo.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumComponent,
    LogoComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
  ],
  exports: [HeaderComponent, FooterComponent, BreadcrumComponent],
})
export class CoreModule { }
