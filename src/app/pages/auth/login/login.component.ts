import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../../services/auth.service';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NzFormModule, ReactiveFormsModule, NzInputModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = {} as FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: ["admin@mail.com", [Validators.required, Validators.email]],
            password: ["123456", Validators.required]
        })
    }

    login() {
        if (this.loginForm.valid) {
            console.log(this.loginForm)
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe();
        }
    }
}
