import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgFor, NgForOf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
@Component({
    selector: 'app-add',
    standalone: true,
    imports: [ReactiveFormsModule, NzPageHeaderModule, NzFormModule, NzInputModule, FormsModule,
    ],
    templateUrl: './add.component.html',
    styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
    productForm: FormGroup = {} as FormGroup
    constructor(private fb: FormBuilder, private productService: ProductService) { }

    ngOnInit(): void {
        this.createForm();
    }


    createForm() {
        this.productForm = this.fb.group({
            title: [""],
            description: [""],
            quantity: [""],
            price: [""],
            priceAfterDiscount: [""],
            // imageCover: [""],
            // category: [""],

        })
    }

    save() {
        this.productService.add().subscribe();

    }
}
