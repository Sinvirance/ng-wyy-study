import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Song, SongSheet } from './data-types/common.types';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { SongService } from './song.service';


@Injectable({
    providedIn: ServicesModule
})
export class SheetService {
    constructor(
        private http: HttpClient,
        @Inject(API_CONFIG) private uri: string,
        private songService: SongService
    ) {
    }

    // 通过歌单id，获取对应歌单详情数据
    getSongSheetDetail(id: number): Observable<SongSheet> {
        const params = new HttpParams().set('id', id.toString());
        return this.http.get<{ playlist: SongSheet }>(this.uri + 'playlist/detail', { params })
            .pipe(map((resp) => resp.playlist));
    }

    // 点击歌单列表获取完整可播放歌曲数组
    playSheet(id: number): Observable<Song[]> {
        // 通过歌单id获取歌单信息
        return this.getSongSheetDetail(id)
            // pluck 获取得到的的歌单信息对象中的 trackIds 属性值，
            .pipe(pluck('trackIds'), switchMap(trackIds => this.songService.getSongList1(trackIds)));
    }
}
