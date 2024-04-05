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
    typePage: string = "";
    constructor(private router: Router, private route: ActivatedRoute) {
        if (this.route.snapshot.params['id']) {
            this.typePage = "ویرایش"
        }
    }
    ngOnInit(): void {
        const urls = this.router.url.split("/")
        if (urls[urls.length - 1] == "add") {
            this.typePage = "افزودن"
        }
        this.addLink = `${urls[0]}/${urls[1]}/${urls[2]}/add`
    }

}
