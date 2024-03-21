import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../common/page-header/page-header.component';
import { TableComponent } from '../../common/table/table.component';
import { Column } from '../../../models/column.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [FormsModule, TableComponent, PageHeaderComponent],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, AfterViewInit {
    @ViewChild("searchInput") searchInput: ElementRef = {} as ElementRef;
    loading: boolean = true;
    items: Product[] = [];
    size: number = 10;
    total: number = 0;
    titleSearchShow: boolean = false;
    searchTitle: string = "";
    columns: Column[] = [
        { name: "عنوان", value: "title", type: "string" },
        { name: "تعداد", value: "quantity", type: "number" },
        { name: "قیمت", value: "price", type: "number" },
        { name: "با تخفیف", value: "priceAfterDiscount", type: "number" },
        { name: "تصویر", value: "imageCover", type: "image" },
        { name: "دسته", value: "category", type: "model", prop: "name" },
        { name: "تاریخ ایجاد", value: "createdAt", type: "date" },
        { name: "تاریخ وبرایش", value: "updatedAt", type: "date" },
    ]

    constructor(private productService: ProductService) { }


    ngOnInit(): void {
        this.getProducts(1, this.size)
    }

    ngAfterViewInit(): void {
        this.searchHanlder();
    }

    getProducts(page: number = 1, size: number = 10) {
        this.productService.list(page, size).subscribe(q => {
            this.items = q.data;
            this.loading = false;
            this.total = q.paginationResult.numberOfPages;
        });
    }

    changePage(page: number) {
        this.loading = true;
        this.getProducts(page, this.size);
    }

    changeSize(size: number) {
        this.loading = true;
        this.size = size;
        this.getProducts(1, size);
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
            this.items = q.data;
            this.total = q.paginationResult.numberOfPages;
        });


    }

}
