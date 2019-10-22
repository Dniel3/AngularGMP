import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumComponent, LogoComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, BreadcrumComponent],

})
export class CoreModule { }
