import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../common/page-header/page-header.component';
import { FormComponent } from '../../../common/form/form.component';
import { ProductService } from '../../../../services/product.service';
import { Form } from '../../../../models/form.model';
import { Product } from '../../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [PageHeaderComponent, FormComponent],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
    productId: number = 0;
    productModel: Product = {} as Product;
    categories: Category[] = [];
    clear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    productForms: Form[] = [
        { label: "عنوان", name: "title", type: "text", rules: ["required"], error: "اجباری" },
        { label: "قیمت", name: "price", type: "number" },
        { label: "توضیحات", name: "description", type: "textarea" },
        { label: "دسته", name: "categoryId", type: "select", options: this.categories },
        { label: "تصویر", name: "images", type: "imageArray" },
    ];

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private categoryService: CategoryService
    ) {
        this.productId = this.route.snapshot.params['id'];
    }



    ngOnInit(): void {
        this.getCategories();
        if (this.productId) {
            this.getProduct();
        }
    }

    getCategories() {
        this.categoryService.list().subscribe(q => {
            this.categories.push(...q)
        })
    }

    getProduct() {
        this.productService.get(this.productId).subscribe(q => this.productModel = q);
    }

    saveProduct(model: Product) {
        if (this.productId) {
            this.productService.update(this.productId, model).subscribe();
        } else {
            this.productService.add(model).subscribe({
                next: (q) => {
                    if (q.id) {
                        this.clear.next(true)
                    }
                }
            })
        }
    }
}
