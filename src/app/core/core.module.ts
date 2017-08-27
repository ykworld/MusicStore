import { AppRoutingModule } from './../../app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HomeComponent
  ],
  providers: []
})

export class CoreModule {}
