import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule
  ],
  exports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule,
  ]
})
export class ShareModule {
}
