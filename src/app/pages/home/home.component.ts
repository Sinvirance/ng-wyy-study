import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Banner, HotTag, Singer, SongSheet } from '../../services/data-types/common.types';
import { FromToInterface, NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { SingerService } from '../../services/singer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.less' ]
})
export class HomeComponent implements OnInit {
  banners: Banner[] = [];
  hotTags: HotTag[] = [];
  songSheetList: SongSheet[] = [];
  singers: Singer[] = [];
  carouselActiveIndex = 0;

  // ! 非空断言操作符，用于断言操作对象是非 null 和非undefined 类型，这只是为了跳过编译器检查
  @ViewChild(NzCarouselComponent, { static: true })
  private nzCarousel: any;

  constructor(
    private homeService: HomeService,
    private singerService: SingerService
  ) {
    this.getBanners();
    this.getHotTags();
    this.getPersonalSongSheetList();
    this.getEnterSinger();
  }

  ngOnInit(): void {
  }

  private getBanners() {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }

  private getHotTags() {
    this.homeService.getHotTags().subscribe(hotTags => {
      this.hotTags = hotTags;
    });
  }

  private getPersonalSongSheetList() {
    this.homeService.getPersonalSongSheetList().subscribe(songSheets => {
      this.songSheetList = songSheets;
    });
  }

  private getEnterSinger() {
    this.singerService.getEnterSinger().subscribe(singers => {
      console.log(singers);
      this.singers = singers;
    });
  }

  onBeforeChange($event: FromToInterface) {
    this.carouselActiveIndex = $event.to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

}
