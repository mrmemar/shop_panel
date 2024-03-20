import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../common/page-header/page-header.component';
import { FormComponent } from '../../common/form/form.component';
import { Form } from '../../../models/form.model';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [PageHeaderComponent, FormComponent],
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
    id: string = ""
    forms: Form[] = [
        { label: "نام", type: "text", name: "name", rules: ['required'] },
        { label: "تصویر", type: "image", name: "image" },
    ];

    constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params["id"]
        console.log(this.id)
    }

    save(form: Category) {
        if (this.id) {

        } else {
            this.categoryService.add(form).subscribe();
        }
    }
}
