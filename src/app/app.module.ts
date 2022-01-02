import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    RouterModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
