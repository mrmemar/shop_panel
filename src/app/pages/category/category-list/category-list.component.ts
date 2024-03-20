import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../common/page-header/page-header.component';
import { TableComponent } from '../../common/table/table.component';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { Column } from '../../../models/column.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [PageHeaderComponent, TableComponent],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
    items: Category[] = [];
    total: number = 0;
    columns: Column[] = [
        { name: "نام", type: "string", value: "name" },
        { name: "تصویر", type: "image", value: "image" },
        { name: "تاریخ ایجاد", type: "date", value: "createdAt" },
        { name: "تاریخ ویرایش", type: "date", value: "updatedAt" },
        { name: "عملیات", type: "action", value: "" },
    ]
    constructor(private categoryService: CategoryService, private route: Router) { }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.categoryService.list().subscribe(q => {
            this.items = q.data;
            this.total = q.paginationResult.numberOfPages;
        })
    }

    remove(id: string) {
        this.categoryService.remove(id).subscribe({
            next: (value) => {
                console.log(value)
                this.getCategories()
            },
        });
    }

    update(id: string) {
        this.route.navigate([`/categories/edit/${id}`])
    }
}
