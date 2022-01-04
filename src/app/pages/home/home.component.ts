import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Banner, HotTag, Singer, SongSheet } from '../../services/data-types/common.types';
import { FromToInterface, NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { SingerService } from '../../services/singer.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
    private singerService: SingerService,
    private route: ActivatedRoute
  ) {
    this.route.data.pipe(map(res => res.homeDatas)).subscribe(([ banners, hotTags, songSheetList, singers ]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheetList = songSheetList;
      this.singers = singers;
    });
  }

  ngOnInit(): void {
  }

  onBeforeChange($event: FromToInterface) {
    this.carouselActiveIndex = $event.to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

}
