import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Menu } from '../../models/menu.model';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { User } from '../../models/user.model';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink,
        NzAvatarModule, NzFlexModule, NzPopoverModule],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
    profile: User = {} as User;
    isCollapsed = false;
    isPopover: boolean = false;
    menuItems: Menu[] = [];

    constructor(private route: ActivatedRoute) {
        this.menuItems = [
            {
                title: "محصولات", icon: "shop", link: "/panel/products", children: [
                    { title: "لیست", link: "/panel/products/list" },
                    { title: "افزودن", link: "/panel/products/add" },
                ]
            },
            {
                title: "دسته ها", icon: "partition", link: "/panel/categories", children: [
                    { title: "لیست", icon: "menu", link: "/panel/categories/list" },
                    { title: "افزودن", link: "/panel/categories/add" },
                ]
            },
            {
                title: "کاربران", icon: "user", link: "/panel/users", children: [
                    { title: "لیست", link: "/panel/users/list" },
                    { title: "افزودن", link: "/panel/users/add" },
                ]
            },
        ]
    }

    ngOnInit(): void {
        this.getProfile();
    }

    getProfile() {
        this.route.data.subscribe(q => {
            this.profile = q['profile']
        });
    }
}
