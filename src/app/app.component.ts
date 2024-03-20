import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Menu } from './models/menu.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isCollapsed = false;
    menuItems: Menu[];

    constructor() {
        this.menuItems = [
            {
                title: "محصولات", link: "/products", children: [
                    { title: "لیست", link: "/products/list" },
                    { title: "افزودن", link: "/products/add" },
                ]
            },
            {
                title: "کاربران", link: "/users", children: [
                    { title: "لیست", link: "/users/list" },
                    // { title: "افزودن", link: "/products/add" },
                ]
            }
        ]
    }
}
