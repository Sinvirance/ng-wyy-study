import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Song, SongUrl, trackId } from './data-types/common.types';
import { forkJoin, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: ServicesModule
})
export class SongService {
    constructor(
        private http: HttpClient,
        @Inject(API_CONFIG) private uri: string
    ) {
    }

    // 获取对应id歌曲详情，支持多个id
    getSongDetailAll(ids: string): Observable<Song[]> {
        const params = new HttpParams().set('ids', ids);
        return this.http.get<{ songs: Song[] }>(this.uri + 'song/detail', { params })
            .pipe(map((resp) => resp.songs));
    }

    // 通过歌曲的id获取歌曲的播放url
    getSongUrl(ids: string): Observable<SongUrl[]> {
        const params = new HttpParams().set('id', ids);
        return this.http.get<{ data: SongUrl[] }>(this.uri + 'song/url', { params })
            .pipe(map((res) => res.data));
    }

    // 获取歌曲或者歌曲数组对应的的播放url歌曲对象：
    getSongList(songs: Song | Song[]): Observable<Song[]> {
        // Array.isArray：检查传入的参数是否为Array，是的话
        const songArr = Array.isArray(songs) ? songs.slice() : [ songs ];
        // join 方法将经过map形成的 idArr 转化为用 ',' 的字符串
        const ids = songArr.map(item => item.id).join(',');
        // return new Observable<Song[]>()
        return new Observable((observer: Subscriber<Song[]>) => {
            this.getSongUrl(ids).subscribe(urls => {
                observer.next(this.generateSongList(songArr, urls));
            });
        });
    }

    // 获取歌曲或者歌曲数组对应的的播放url
    getSongList1(trackIds: trackId | trackId[]): Observable<Song[]> {
        // Array.isArray：检查传入的参数是否为Array，是的话
        const trackIdArr = Array.isArray(trackIds) ? trackIds.slice() : [ trackIds ];
        // join 方法将经过map形成的 idArr 转化为用 ',' 的字符串
        const ids = trackIdArr.map(item => item.id).join(',');
        return new Observable((observer: Subscriber<Song[]>) => {
            // 使用forkJoin 操作符来并行http请求，获取最后一次请求得到的数据
            forkJoin([ this.getSongUrl(ids), this.getSongDetailAll(ids) ]).subscribe(resp => {
                observer.next(this.generateSongList(resp[1], resp[0]));
            });
        });
    }

    // 将原本歌曲数组信息和对应的url数组信息生成我们需要的歌曲数组对象
    private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
        const result: Song[] = [];
        songs.forEach(song => {
            // find: 返回通过与函数判断的第一个数组元素的值
            // 使用非空断言排除 url.id === song.id 不存在的情况
            const url = urls.find((url) => url.id === song.id)!.url;
            result.push({ ...song, url });
        });
        return result;
    }
}
