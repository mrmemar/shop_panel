import { AfterContentChecked, AfterContentInit, AfterRenderOptions, AfterRenderRef, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Menu } from '../../models/menu.model';

@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.css'
})
export class PanelComponent {
    isCollapsed = false;
    menuItems: Menu[] = [];

    constructor() {
        this.menuItems = [
            {
                title: "محصولات", link: "/panel/products", children: [
                    { title: "لیست", link: "/panel/products/list" },
                    { title: "افزودن", link: "/panel/products/add" },
                ]
            },
            {
                title: "دسته ها", link: "/panel/categories", children: [
                    { title: "لیست", link: "/panel/categories/list" },
                    { title: "افزودن", link: "/panel/categories/add" },
                ]
            },
            {
                title: "کاربران", link: "/panel/users", children: [
                    { title: "لیست", link: "/panel/users/list" },
                    { title: "افزودن", link: "/panel/users/add" },
                ]
            },
        ]
    }
}
