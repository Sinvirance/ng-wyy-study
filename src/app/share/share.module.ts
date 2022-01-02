import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { WyyUiModule } from "./wyy-ui/wyy-ui.module";
import { NzUiModule } from "./nz-ui/nz-ui.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzUiModule,
    WyyUiModule
  ],
  exports: [
    CommonModule,
    NzButtonModule,
    NzUiModule,
    WyyUiModule
  ]
})
export class ShareModule {
}
