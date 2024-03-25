import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink, NzResultModule],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
