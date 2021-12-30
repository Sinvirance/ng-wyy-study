import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceModule } from "../service/service.module";
import { PagesModule } from "../pages/pages.module";
import { ShareModule } from "../share/share.module";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { throwError } from "rxjs";
import { NZ_I18N, zh_CN } from "ng-zorro-antd/i18n";

registerLocaleData(zh);


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceModule,
    PagesModule,
    ShareModule,
    AppRoutingModule,
  ],
  exports: [
    ShareModule
  ],
  providers: [ { provide: NZ_I18N, useValue: zh_CN } ],
})
export class CoreModule {
  // CoreModule 只能被 AppModule 引入
  // @SkipSelf() 查找Module跳过本身，去父Module查找，这个装饰器能防止循环注入，
  // @Optional() 表示该Module为可选 Module，当查找不到时，使用 Null 赋值
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被 AppModule 引入');
    }
  }
}
