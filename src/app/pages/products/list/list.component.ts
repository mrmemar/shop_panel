import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product } from '../../../models/product.model';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-list',
    standalone: true,
    imports: [NzTableModule, NzDividerModule, NzIconModule, NzInputModule,FormsModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent implements OnInit ,AfterViewInit{
    @ViewChild("searchInput") searchInput: ElementRef = {} as ElementRef;
    loading: boolean = true;
    items: Product[] = [];
    size: number = 10;
    total: number = 0;
    titleSearchShow: boolean = false;
    searchTitle: string = "";
    items$ :Observable<Product[]>= new Observable;
    constructor(private productService: ProductService) { }


    ngOnInit(): void {
        this.getList(1, this.size)
    }

    ngAfterViewInit(): void {
        this.searchHanlder();
    }

    getList(page: number = 1, size: number = 10) {
        // this.items$ = this.productService.getList(page, size).pipe(
        //     tap(q => {
        //         this.loading = false;
        //         this.total = q.total;
        //     }),
        //     map(q => q.products),
        // )
        this.productService.getList(page, size).subscribe(q => {
            this.items = q.products;
            this.loading = false;
            this.total = q.total;
        });
    }

    changePage(page: number) {
        this.loading = true;
        this.getList(page, this.size);
    }

    changeSize(size: number) {
        this.loading = true;
        this.size = size;
        this.getList(1, size);
    }

    searchHanlder() {

        fromEvent(this.searchInput.nativeElement, "keyup").pipe(
            map((event: any) => event.target.value),
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap(q => {
                return this.productService.search(q);
            })
        ).subscribe(q => {
            this.items = q.products;
            this.total = q.total;
        });


    }

}
