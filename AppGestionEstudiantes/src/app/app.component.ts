import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Pages/navbar/navbar.component';
import { FooterComponent } from './Pages/footer/footer.component';
// import {  BrowserAnimationsModule  }  from  '@angular/platform-browser/animations';
// import { NgxToastNotifierModule } from 'ngx-toast-notifier';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet,NavbarComponent,FooterComponent,BrowserAnimationsModule, NgxToastNotifierModule ],
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppGestionEstudiantes';
}
