import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
    selector: 'app-table-cell',
    standalone: true,
    imports: [DatePipe, NzIconModule, NzTableComponent, NzPopconfirmModule, NzButtonModule, NzSpaceModule],
    templateUrl: './table-cell.component.html',
    styleUrl: './table-cell.component.css'
})
export class TableCellComponent {
    @Input() row: any;
    @Input() col: any;
    @Output() remove = new EventEmitter<number>();
    @Output() update = new EventEmitter<number>();


    _remove(id: number) {
        this.remove.emit(id);
    }

    _update(id: number) {
        this.update.emit(id);
    }
}
