import { Component, OnInit } from '@angular/core';
import { DogApiService } from '../Services/dog-api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Card {
  id: number;
  image: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  cards: Card[] = [];
  flippedCards: Card[] = [];
  message: string = '';
  counter: number = 0;
  timer: any;
  gameStarted: boolean = false;
  showGame: boolean = false;

  constructor(private dogApiService: DogApiService) { }

  ngOnInit(): void {
    // El juego y el contador se iniciarán al presionar el botón
  }

  startGameAndTimer(): void {
    this.startGame();
    this.startCounter();
    this.gameStarted = true;
  }

  startGame(): void {
    this.dogApiService.getRandomDogImages(8).subscribe(response => {
      const images = response.message;
      this.cards = [];

      // Duplicar y mezclar las imágenes
      images.forEach((image: string) => {
        this.cards.push({ id: this.cards.length, image, flipped: false, matched: false });
        this.cards.push({ id: this.cards.length, image, flipped: false, matched: false });
      });

      this.cards = this.shuffle(this.cards);
    });
  }

  startCounter(): void {
    this.counter = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.counter++;
    }, 1000);
  }

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  flipCard(card: Card): void {
    if (this.flippedCards.length < 2 && !card.flipped) {
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.checkForMatch();
      }
    }
  }

  checkForMatch(): void {
    const [card1, card2] = this.flippedCards;
    if (card1.image === card2.image) {
      card1.matched = true;
      card2.matched = true;
      this.flippedCards = [];

      if (this.cards.every(card => card.matched)) {
        this.message = '¡Felicidades! Has encontrado todos los pares.';
        alert(this.message);
        clearInterval(this.timer);
      }

    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }

  resetGame(): void {
    this.startGame();
    this.message = '';
    this.counter = 0; // Reinicia el contador
    clearInterval(this.timer); // Detiene el temporizador
    this.startCounter(); // Inicia el contador nuevamente
  }
  exitGame(): void {
    this.showGame = false; // Oculta la pantalla del juego
    this.gameStarted = false; // Reinicia el estado del juego
    clearInterval(this.timer); // Detiene el temporizador
  }
}
