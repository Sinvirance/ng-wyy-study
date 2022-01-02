import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from "./services.module";
import { Observable } from "rxjs";
import { Banner } from "./data-types/common.types";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

export interface RespBanner {
  banners: Banner[],
  code: string,
}

// @Injectable：设置服务的依赖注入元数据
// providedIn: 设置依赖注入的对象，root 表示注入到 AppModule
@Injectable({
  providedIn: ServicesModule
})
export class HomeService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
  ) {
  }

  getBanners(): Observable<Banner[]> {
    return this.http.get<{banners: Banner[]}>(this.uri + 'banner')
      .pipe(map((resp) => resp.banners));
  }

}
