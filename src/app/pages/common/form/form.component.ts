import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormArrayName, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Form } from '../../../models/form.model';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
    selector: 'app-form',
    standalone: true,
    imports: [NzFormModule, ReactiveFormsModule, InputComponent, NzButtonModule],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnChanges {
    @Input() formItems: Form[] = [];
    @Input() model: any;
    @Input() buttonName: string = "دخیره";
    @Input() clear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Output() save = new EventEmitter();
    loading = false;
    customForm: FormGroup = {} as FormGroup;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.route.snapshot.params["id"]) {
            this.loading = true;
        }
        this.createForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['model'] && changes['model'].currentValue && !changes['model'].firstChange) {
            this.loading = false;
        }
    }

    createForm() {
        const formControllers: any = {};
        this.formItems.forEach(form => {
            let rulles: any[] = [];
            form.rules?.forEach(rull => {
                if (rull == "required") {
                    rulles.push(Validators.required);
                }
            });
            if (form.type == "imageArray") {
                formControllers[form.name] = new FormArray([])
                console.log()
            } else {
                formControllers[form.name] = new FormControl("", rulles)
            }

        })
        this.customForm = new FormGroup(formControllers);
        this.clear.subscribe(q => {
            if (q) {
                this.clearForm()
            }
        })
    }

    _save() {
        console.log(this.customForm.value)
        if (this.customForm.valid) {
            this.loading = true;
            this.save.emit(this.customForm.value);
            this.loading = false;
        }
    }

    clearForm() {
        // this.avatarUrl = "";
        // this.imageUrl = "";
        // this.fileList = [];
        this.customForm.reset();
        this.clear.next(false);
        this.loading = false;
    }


}
