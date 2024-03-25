import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../common/page-header/page-header.component';
import { FormComponent } from '../../../common/form/form.component';
import { Form } from '../../../../models/form.model';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [PageHeaderComponent, FormComponent],
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
    clear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    categoryId: number = 0;
    categoryModel: Category = {} as Category;
    categoryForms: Form[] = [];

    constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
        this.categoryId = this.route.snapshot.params["id"];
        this.categoryForms = [
            { label: "نام", type: "text", name: "name", rules: ['required'] },
            { label: "تصویر", type: "image", name: "image" },
        ]
    }

    ngOnInit(): void {
        if (this.categoryId) {
            this.getCategory();
        }
    }

    getCategory() {
        this.categoryService.get(this.categoryId).subscribe(q => this.categoryModel = q)
    }

    saveCategory(form: Category) {
        if (this.categoryId) {
            this.categoryService.update(this.categoryId, form).subscribe();
        } else {
            this.categoryService.add(form).subscribe({
                next: (q) => {
                    if (q.id) {
                        this.clear.next(true);
                    }
                }
            });
        }
    }
}
