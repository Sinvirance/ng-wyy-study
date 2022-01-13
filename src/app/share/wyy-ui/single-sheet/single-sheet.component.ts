import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SongSheet } from '../../../services/data-types/common.types';

@Component({
    selector: 'app-single-sheet',
    templateUrl: './single-sheet.component.html',
    styleUrls: [ './single-sheet.component.less' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSheetComponent implements OnInit {
    @Input()
    sheet!: SongSheet;
    @Output()
    onPlay = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    playSheet(id: number) {
        // 将@Output注解修饰的变量发射出去
        this.onPlay.emit(id);
    }
}
