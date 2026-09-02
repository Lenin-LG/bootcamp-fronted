import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  imports: [],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  steps = [
    { title: 'Postula', desc: 'Rindes una breve evaluación de ingreso. Sin costo, sin letra chica.' },
    { title: '2 meses intensivos', desc: 'Clases en vivo, práctica diaria y proyectos reales tipo empresa.' },
    { title: 'Empleabilidad', desc: 'Preparamos tu CV, portafolio y simulamos entrevistas técnicas.' },
    { title: 'Consigues trabajo', desc: 'A partir de ese momento empiezas a pagar el bootcamp, en cuotas accesibles.' },
  ];
}
