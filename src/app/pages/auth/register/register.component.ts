import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [NzFormModule, ReactiveFormsModule, NzInputModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup = {} as FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.registerForm = this.fb.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            passwordConfirm: ["", Validators.required]
        })
    }

    register() {
        if (this.registerForm.valid) {
            console.log(this.registerForm)
            this.authService.register({
                name: this.registerForm.value.name,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password,
                passwordConfirm: this.registerForm.value.passwordConfirm,
            }).subscribe();
        }
    }
}
