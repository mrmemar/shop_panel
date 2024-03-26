import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Form } from '../../../models/form.model';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { JsonPipe, NgIf } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzUploadModule, NgIf,
        NzIconModule, JsonPipe],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {
    @Input() formGroup: FormGroup<any> = {} as FormGroup;
    @Input() formItem: Form = {} as Form;
    @Input() formItemValue: any;
    @Input() clear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loading = false;
    imageUrl?: string;
    fileList: NzUploadFile[] = []

    constructor(private msg: NzMessageService) {
    }

    ngOnInit(): void {
        this.clear.subscribe(q => {
            if (q) {
                this.fileList = [];
            }
        })
        // console.log(this.formItem)
    }

    ngOnChanges(changes: SimpleChanges): void {
        // edit mode
        if (changes['formItemValue'] && changes['formItemValue'].currentValue && !changes['formItemValue'].firstChange) {
            const newValue = changes['formItemValue'].currentValue
            if (this.formItem.type == "imageArray") {
                this.fileList = [];
                newValue.forEach((img: string) => {
                    this.fileList.push({
                        name: img.split("/")[img.split("/").length - 1],
                        uid: img.split("/")[img.split("/").length - 1],
                        url: img
                    })
                })
            }
            const value: any = {};
            value[this.formItem.name] = newValue;
            // if form array
            if (this.formItem.name == 'images') {
                value.images.forEach(() => {
                    this.getFormArray('images').push(new FormControl());
                })
            }
            this.formGroup.patchValue(value);
        }

    }

    fileChange(info: { file: NzUploadFile }): void {
        this.loading = true
        switch (info.file.status) {
            case 'uploading':
                this.loading = true;
                break;
            case 'done':
                this.imageUrl = info.file.response.location;
                this.formGroup.patchValue({
                    'image': this.imageUrl
                })
                this.loading = false;
                break;
            case 'error':
                this.msg.error('Network error');
                this.loading = false;
                break;
        }
    }

    getFormArray(name: string): FormArray<any> {
        return this.formGroup.get(name) as FormArray<any>;
    }

    fileListChange(listName: string, info: { fileList: NzUploadFile[], file: NzUploadFile }) {
        this.getFormArray(listName).clear();
        const files: string[] = []
        info.fileList.forEach(file => {
            this.getFormArray(listName).push(new FormControl());
            if (file.response) {
                files.push(file.response.location)
            } else if (file.url) {
                files.push(file.url)
            }
        })
        this.getFormArray(listName).patchValue(files)
    }


}
