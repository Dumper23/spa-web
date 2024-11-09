import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserData } from '../../../shared/Interfaces/user';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
  ){}


  openTab(evt: Event, cityName: string): void {
    const tabcontent = document.getElementsByClassName('tabcontent');
    const tablinks = document.getElementsByClassName('tablinks');

    // Hide all tab contents
    for (let i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = 'none';
    }

    // Remove the 'active' class from all tab links
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }

    // Show the clicked tab's content
    const cityTab = document.getElementById(cityName);
    if (cityTab) {
      cityTab.style.display = 'block';
    }

    // Add the 'active' class to the clicked tab link
    const clickedTab = evt.currentTarget as HTMLElement;
    clickedTab.classList.add('active');
  }
  

}
