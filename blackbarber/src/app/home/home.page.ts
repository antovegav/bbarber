import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}
}

interface Ticket {
  hour: number;
  day: number;
}

class Calendar {
  private tickets: Ticket[] = [];

  public addTicket(hour: number, day: number): void {
    this.tickets.push({ hour, day });
    this.render();
  }

  private render(): void {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = '';

    for (let day = 0; day < 7; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';

      for (let hour = 0; hour < 24; hour++) {
        const hourDiv = document.createElement('div');
        hourDiv.className = 'hour';
        hourDiv.innerText = `${hour}:00`;

        const ticket = this.tickets.find(t => t.hour === hour && t.day === day);
        if (ticket) {
          const ticketDiv = document.createElement('div');
          ticketDiv.className = 'ticket';
          ticketDiv.innerText = 'Ticket';
          ticketDiv.addEventListener('click', () => this.removeTicket(ticket));
          hourDiv.appendChild(ticketDiv);
        }

        dayDiv.appendChild(hourDiv);
      }

      app.appendChild(dayDiv);
    }
  }

  private removeTicket(ticket: Ticket): void {
    this.tickets = this.tickets.filter(t => t !== ticket);
    this.render();
  }
}

const calendar = new Calendar();