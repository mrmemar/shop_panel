import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
@Component({
    selector: 'app-page-header',
    standalone: true,
    imports: [NzPageHeaderModule, NzSpaceModule, RouterLink],
    templateUrl: './page-header.component.html',
    styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {
    @Input() title: string = "";
    addLink: string = "";
    constructor(private route: Router) {

    }
    ngOnInit(): void {
        const link = this.route.url.split("/")[1]
        this.addLink = `/${link}/add`
    }

}
