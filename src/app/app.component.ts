import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { JuegoComponent } from "./juego/juego.component";
import { DogApiService } from './Services/dog-api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, JuegoComponent],
  providers:[DogApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AAT1-JuegoMemoria';
}
