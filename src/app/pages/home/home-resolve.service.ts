import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Banner, HotTag, Singer, SongSheet } from '../../services/data-types/common.types';
import { HomeService } from '../../services/home.service';
import { SingerService } from '../../services/singer.service';
import { Resolve } from '@angular/router';

type HomeDataType = [ Banner[], HotTag[], SongSheet[], Singer[] ];

@Injectable()
export class HomeResolverService implements Resolve<HomeDataType> {
    constructor(
        private homeServe: HomeService,
        private singerServe: SingerService
    ) {
    }

    resolve(): Observable<HomeDataType> {
        // forkJoin: 对数组每一项流操作并返回每一个Observable 对象
        return forkJoin([
            this.homeServe.getBanners(),
            this.homeServe.getHotTags(),
            this.homeServe.getPersonalSongSheetList(),
            this.singerServe.getEnterSinger()
            // 只获取第一个返回值
        ]).pipe(first());
    }
}
