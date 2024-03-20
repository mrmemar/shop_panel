import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { PageHeaderComponent } from '../../common/page-header/page-header.component';
import { TableComponent } from '../../common/table/table.component';
import { Column } from '../../../models/column.model';
@Component({
    selector: 'app-list',
    standalone: true,
    imports: [PageHeaderComponent, TableComponent],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
    items: User[] = [];
    loading: boolean = false;
    titleSearchShow: boolean = false;
    total: number = 0;
    size: number = 10;
    columns: Column[] = [
        {
            name: "نام",
            value: "name",
            type: "string"
        },
        {
            name: "ایمیل",
            value: "email",
            type: "email"
        },
        {
            name: "نقش",
            value: "role",
            type: "string"
        },
        {
            name: "فعال",
            value: "active",
            type: "boolean"
        },
        {
            name: "تاریخ ایجاد",
            value: "createdAt",
            type: "date"
        },
        {
            name: "تاریخ ویرایش",
            value: "updatedAt",
            type: "date"
        }
    ]
    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.list().subscribe(
            q => {
                this.items = q.data;
                this.total = q.paginationResult.numberOfPages
            }
        )
    }




}
