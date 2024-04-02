import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-page-header',
    standalone: true,
    imports: [NzPageHeaderModule, NzSpaceModule, RouterLink, NzButtonModule, NzIconModule],
    templateUrl: './page-header.component.html',
    styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {
    @Input() title: string = "";
    addLink: string = "";
    constructor(private route: Router) {

    }
    ngOnInit(): void {
        const urls = this.route.url.split("/")
        urls.splice(urls.length - 1, 1)
        const link = urls.join("/")
        this.addLink = `/${link}/add`
    }

}
