import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Form } from '../../../models/form.model';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-form',
    standalone: true,
    imports: [NzFormModule, NzInputModule, ReactiveFormsModule, NzUploadModule, NgIf],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnChanges {
    @Input() forms: Form[] = [];
    @Input() model: any;
    @Output() save = new EventEmitter()
    customForm: FormGroup = {} as FormGroup;
    loading = false;
    avatarUrl?: string;


    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.route.snapshot.params["id"]) {
            this.loading = true;
        }
        const formControllers: any = {};
        this.forms.forEach(form => {
            let rulles: any[] = [];
            form.rules?.forEach(rull => {
                switch (rull) {
                    case "required":
                        rulles.push(Validators.required);
                        break;
                }
            })
            formControllers[form.name] = new FormControl("", rulles)
        })
        this.customForm = new FormGroup(formControllers);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['model'].currentValue && !changes['model'].firstChange) {
            this.customForm.patchValue(changes['model'].currentValue);
            this.loading = false;
        }
    }

    create() {
        if (this.customForm.valid) {
            this.save.emit(this.customForm.value)
        }
    }


}
