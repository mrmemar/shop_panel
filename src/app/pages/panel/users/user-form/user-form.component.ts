import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../../common/form/form.component';
import { PageHeaderComponent } from '../../../common/page-header/page-header.component';
import { User } from '../../../../models/user.model';
import { Form } from '../../../../models/form.model';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [FormComponent, PageHeaderComponent],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
    userId: number = 0;
    clear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    userModel: User = {} as User;
    userForms: Form[] = [];

    constructor(private userService: UserService, private route: ActivatedRoute) {
        this.userId = this.route.snapshot.params['id'];
        this.userForms = [
            { label: "نام", name: "name", type: "text" },
            { label: "ایمیل", name: "email", type: "text" },
            { label: "کلمه عبور", name: "password", type: "text" },
            { label: "تصویر", name: "avatar", type: "image" },
        ]
    }

    ngOnInit(): void {
        if (this.userId) {
            this.getUser();
        }
    }

    getUser() {
        this.userService.get(this.userId).subscribe(q => this.userModel = q);
    }

    saveUser(model: User) {
        if (this.userId) {
            this.userService.update(this.userId, model).subscribe();
        } else {
            this.userService.add(model).subscribe({
                next: (q) => {
                    if (q.id) {
                        this.clear.next(true);
                    }
                }
            })
        }

    }
}
