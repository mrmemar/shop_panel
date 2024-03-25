import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../common/page-header/page-header.component';
import { TableComponent } from '../../../common/table/table.component';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { Column } from '../../../../models/column.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [PageHeaderComponent, TableComponent],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
    categoryItems: Category[] = [];
    total: number = 0;
    categoryColumns: Column[] = [];

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.categoryColumns = [
            { name: "ID", type: "number", value: "id" },
            { name: "نام", type: "string", value: "name" },
            { name: "تصویر", type: "image", value: "image" },
            { name: "تاریخ ایجاد", type: "date", value: "creationAt" },
            { name: "تاریخ ویرایش", type: "date", value: "updatedAt" },
            { name: "عملیات", type: "action", value: "" },
        ];
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.categoryService.list().subscribe(q => {
            this.categoryItems = q;
        })
    }

    removeCategory(id: number) {
        this.categoryService.remove(id).subscribe({
            complete: () => {
                this.getCategories()
            },
        });
    }

    updateCategory(id: number) {
        this.router.navigate([`panel/categories/edit/`, id])
    }
}
