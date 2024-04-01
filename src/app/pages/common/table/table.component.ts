import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Column } from '../../../models/column.model';


import { ActivatedRoute, Router } from '@angular/router';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { TableHeadComponent } from '../table-head/table-head.component';
@Component({
    selector: 'app-table',
    standalone: true,
    imports: [NzTableComponent, TableCellComponent, TableHeadComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnChanges {
    loading: boolean = true;
    pageIndex: number;
    pageSize: number;
    @Input() total: number = 0;
    @Input() data: any[] = [];
    @Input() columns: Column[] = [];
    @Output() remove = new EventEmitter<number>();
    @Output() update = new EventEmitter<number>();
    @Output() getList = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute) {
        this.pageIndex = this.route.snapshot.queryParams['page'] || 1;
        this.pageSize = this.route.snapshot.queryParams['size'] || 10;
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['data'].firstChange) {
            this.loading = false
        }
    }

    _remove(id: number) {
        this.loading = true;
        this.remove.emit(id);
    }

    _update(id: number) {
        this.loading = true;
        this.update.emit(id);
    }

    _changePage(pageIndex: number) {
        this.loading = true;
        this.router.navigate([], { queryParams: { page: pageIndex }, queryParamsHandling: 'merge' }).then(() => {
            this.getList.emit();
        });
    }

    _changeSize(size: number) {
        this.loading = true;
        this.pageSize = size;
        this.router.navigate([], { queryParams: { size: this.pageSize }, queryParamsHandling: 'merge' }).then(() => {
            this.getList.emit();
        })
    }




}
