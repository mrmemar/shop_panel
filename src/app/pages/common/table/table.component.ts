import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Column } from '../../../models/column.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [NzTableComponent, DatePipe],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges {

    loading: boolean = true;
    size: number = 10;
    titleSearchShow: boolean = false;
    @Input() total: number = 0;
    @Input() data: any[] = [];
    @Input() columns: Column[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'].currentValue.length > 0) {
            this.loading = false
        }
    }
}
