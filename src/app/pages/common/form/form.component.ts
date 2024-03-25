import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Form } from '../../../models/form.model';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
    selector: 'app-form',
    standalone: true,
    imports: [NzFormModule, NzInputModule, ReactiveFormsModule, NzUploadModule,
        NgIf, NzIconModule, NzSelectModule, NzModalModule, NzButtonModule],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnChanges {
    @Input() forms: Form[] = [];
    @Input() model: any;
    @Input() clear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Output() save = new EventEmitter();

    customForm: FormGroup = {} as FormGroup;
    loading = false;
    avatarUrl?: string;
    imageUrl?: string;
    fileList: NzUploadFile[] = []
    previewImage: string | undefined = '';
    previewVisible = false;

    constructor(private route: ActivatedRoute, private msg: NzMessageService) { }

    ngOnInit(): void {
        if (this.route.snapshot.params["id"]) {
            this.loading = true;
        }
        this.createForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // edit mode
        if (changes['model'] && changes['model'].currentValue && !changes['model'].firstChange) {
            this.fillForm(changes['model'].currentValue)
        }

    }

    createForm() {
        const formControllers: any = {};
        this.forms.forEach(form => {
            let rulles: any[] = [];
            form.rules?.forEach(rull => {
                if (rull == "required") {
                    rulles.push(Validators.required);
                }
            });
            formControllers[form.name] = new FormControl("", rulles)
        })
        this.customForm = new FormGroup(formControllers);
        this.clear.subscribe(q => {
            if (q) {
                this.clearForm()
            }
        })
    }

    clearForm() {
        this.avatarUrl = "";
        this.imageUrl = "";
        this.fileList = [];
        this.customForm.reset();
        this.clear.next(false);
        this.loading = false;
    }

    fillForm(model: any) {
        this.customForm.patchValue(model);
        this.avatarUrl = model.image;
        if (model.images && model.images.length) {
            this.fileList = [];
            model.images.forEach((img: string) => {
                this.fileList.push({
                    name: img.split("/")[img.split("/").length - 1],
                    uid: img.split("/")[img.split("/").length - 1],
                    url: img
                })
            })
        }
        this.loading = false;
    }

    _save() {
        if (this.customForm.valid) {
            this.loading = true;
            if (this.imageUrl) {
                this.customForm.value['image'] = this.imageUrl;
            }
            if (this.fileList.length > 0) {
                this.customForm.value['images'] = []
                this.fileList.forEach(file => {
                    if (file.response) {
                        this.customForm.value['images'].push(file.response.location);
                    } else {
                        this.customForm.value['images'].push(file.url);
                    }
                })
            }

            this.save.emit(this.customForm.value);
            this.loading = false;
        }
    }

    private getBase64(img: File, callback: (img: string) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result!.toString()));
        reader.readAsDataURL(img);
    }

    handleChange(info: { file: NzUploadFile }): void {
        this.loading = true
        switch (info.file.status) {
            case 'uploading':
                this.loading = true;
                break;
            case 'done':
                // Get this url from response in real world.
                this.getBase64(info.file!.originFileObj!, (img: string) => {
                    this.avatarUrl = img;
                    this.imageUrl = info.file.response.location;
                    this.loading = false;
                });
                break;
            case 'error':
                this.msg.error('Network error');
                this.loading = false;
                break;
        }
    }
}
