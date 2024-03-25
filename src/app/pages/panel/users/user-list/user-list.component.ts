import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../common/page-header/page-header.component';
import { TableComponent } from '../../../common/table/table.component';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { Column } from '../../../../models/column.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [PageHeaderComponent, TableComponent],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
    userItems: User[] = [];
    total: number = 0;
    userColumns: Column[] = [];

    constructor(private userService: UserService, private router: Router) {
        this.userColumns = [
            { name: "ID", type: "number", value: "id", },
            { name: "نام", type: "string", value: "name", },
            { name: "نقش", type: "string", value: "role", },
            { name: "ایمیل", type: "string", value: "email", },
            { name: "تصویر", type: "image", value: "avatar", },
            { name: "تاریخ ایجاد", type: "date", value: "creationAt", },
            { name: "تاریخ ویرایش", type: "date", value: "updatedAt", },
            { name: "عملیات", type: "action", value: "", },
        ];
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.list().subscribe(q => {
            this.userItems = q;
        });
    }

    updateUser(id: number) {
        this.router.navigate(["panel/users/edit", id])
    }
}
