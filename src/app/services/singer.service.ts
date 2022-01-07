import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';
import { Observable } from 'rxjs';
import { Singer } from './data-types/common.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as queryString from 'querystring';

type SingerParams = {
    offset: number;
    limit: number;
    area: number;
    type: number;
}

const defaultParams: SingerParams = {
    offset: 0,
    limit: 9,
    area: 7,
    type: -1
};

@Injectable({
    providedIn: ServicesModule
})
export class SingerService {
    constructor(
        private http: HttpClient,
        @Inject(API_CONFIG) private uri: string
    ) {
    }

    // 获取歌手列表
    getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
        const params = new HttpParams({ fromString: queryString.stringify(args) });
        return this.http.get<{ artists: Singer[] }>(this.uri + 'artist/list', { params })
            .pipe(map((resp) => resp.artists));
    }

}
