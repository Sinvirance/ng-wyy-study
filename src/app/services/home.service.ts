import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from "./services.module";
import { Observable } from "rxjs";
import { Banner, HotTag, SongSheet } from "./data-types/common.types";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';


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

  // 获取轮播图列表
  getBanners(): Observable<Banner[]> {
    return this.http.get<{banners: Banner[]}>(this.uri + 'banner')
      .pipe(map((resp) => resp.banners));
  }

  // 获取热门歌单分类
  getHotTags(): Observable<HotTag[]> {
    return this.http.get<{tags: HotTag[]}>(this.uri + 'playlist/hot')
      .pipe(map((resp) => {
        return resp.tags.sort((x: HotTag, y: HotTag) => {
          return x.position - y.position;
        }).slice(0, 5);
      }));
  }

  // 获取推荐歌单
  getPersonalSongSheetList(): Observable<SongSheet[]> {
    return this.http.get<{result: SongSheet[]}>(this.uri + 'personalized')
      .pipe(map((resp) => resp.result.slice(0, 16)));
  }
}
