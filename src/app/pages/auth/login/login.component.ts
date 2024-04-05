import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormComponent } from '../../common/form/form.component';
import { Form } from '../../../models/form.model';
import { User } from '../../../models/user.model';
import { BehaviorSubject } from 'rxjs';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForms: Form[] = [];
    model: any;
    clear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private authService: AuthService) {
        this.loginForms = [
            { label: "ایمیل", name: "email", type: "text" },
            { label: "کلمه عبور", name: "password", type: "text" },
        ]
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.model = {
                email: "admin@mail.com",
                password: "admin123"
            }
        }, 0);

    }

    login(model: User) {
        this.authService.login(model).subscribe({
            error: (err) => {
                this.clear.next(true)
            }
        })
    }
}
