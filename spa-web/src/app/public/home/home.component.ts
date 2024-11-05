import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  users: any[] = [];

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ){}

  async navigateToLogin() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });

    //this.router.navigate(['/login']);
  }

}
