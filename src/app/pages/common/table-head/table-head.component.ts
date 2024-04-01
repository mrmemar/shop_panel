import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Column } from '../../../models/column.model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { debounceTime, distinctUntilChanged, exhaustMap, fromEvent, map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-table-head',
    standalone: true,
    imports: [NzInputModule, FormsModule, NzIconModule],
    templateUrl: './table-head.component.html',
    styleUrl: './table-head.component.css'
})
export class TableHeadComponent implements OnInit, AfterViewInit {

    @Input() col: Column = {} as Column;
    @Output() getList = new EventEmitter();
    showInput: boolean = false;
    searchTitle: string = "";
    @ViewChild('searchInput') searchInput: ElementRef = {} as ElementRef;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.col.searchKey && this.route.snapshot.queryParams['search']) {
            this.searchTitle = JSON.parse(this.route.snapshot.queryParams['search'])[this.col.searchKey]
        }
    }

    ngAfterViewInit(): void {
        if (this.col.searchKey) {
            this.searchListener();
        }


    }

    searchListener() {
        fromEvent(this.searchInput.nativeElement, "keyup").pipe(
            map((event: any) => event.target.value),
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap(q => {
                const obj: any = (this.route.snapshot.queryParams['search']) ? JSON.parse(this.route.snapshot.queryParams['search']) : {};
                const key = this.col.searchKey!;
                obj[key] = q;
                return this.router.navigate([], { queryParams: { 'search': JSON.stringify(obj) }, queryParamsHandling: 'merge' })
            })
        ).subscribe(() => {
            this.getList.emit();
        });
    }

    showSearchInput() {
        this.showInput = !this.showInput;
        setTimeout(() => { // this will make the execution after the above boolean has changed
            this.searchInput.nativeElement.focus();
        }, 0);
    }
}
