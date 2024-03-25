import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, shareReplay, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../common/page-header/page-header.component';
import { TableComponent } from '../../../common/table/table.component';
import { Column } from '../../../../models/column.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [FormsModule, TableComponent, PageHeaderComponent],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, AfterViewInit {
    @ViewChild("searchInput") searchInput: ElementRef = {} as ElementRef;
    productItems: Product[] = [];
    total: number = 0;
    productColumns: Column[] = []

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.productColumns = [
            { name: "ID", value: "id", type: "number", },
            { name: "عنوان", value: "title", type: "string", },
            { name: "قیمت", value: "price", type: "number" },
            { name: "دسته", value: "category", type: "model", prop: "name" },
            { name: "تصویر", value: "images", type: "imageArray" },
            { name: "تاریخ ایجاد", value: "creationAt", type: "date" },
            { name: "تاریخ ویرایش", value: "updatedAt", type: "date" },
            { name: "عملیات", value: "", type: "action" },
        ]
    }

    ngOnInit(): void {
        this.getProducts()
    }

    ngAfterViewInit(): void {
        this.searchHanlder();
    }



    getProducts() {
        const pageIndex = this.route.snapshot.queryParams['page'];
        const pageSize = this.route.snapshot.queryParams['size'];
        this.productService.list(pageIndex, pageSize).subscribe(q => {
            this.productItems = q;
            this.total = 50
        });

    }

    removeProduct(id: number) {
        this.productService.remove(id).subscribe({
            complete: () => {
                this.getProducts()
            }
        });
    }

    updateProduct(id: number) {
        this.router.navigate([`/products/edit/`, id])
    }


    searchHanlder() {

        // fromEvent(this.searchInput.nativeElement, "keyup").pipe(
        //     map((event: any) => event.target.value),
        //     debounceTime(1000),
        //     distinctUntilChanged(),
        //     switchMap(q => {
        //         return this.productService.search(q);
        //     })
        // ).subscribe(q => {
        //     this.items = q.data;
        //     this.total = q.paginationResult.numberOfPages;
        // });


    }

}
