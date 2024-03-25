import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-loguot',
    standalone: true,
    imports: [],
    templateUrl: './loguot.component.html',
    styleUrl: './loguot.component.css'
})
export class LoguotComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.logout()
    }

}
