import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-fit',
  imports: [],
  templateUrl: './profile-fit.html',
  styleUrl: './profile-fit.css',
})
export class ProfileFit {
  yes = [
    'Quieres iniciar o cambiar hacia una carrera dev backend.',
    'Puedes dedicarle tiempo real y constancia durante 2 meses.',
    'Buscas resultados concretos: empleo, no solo un certificado.',
    'Te motiva aprender resolviendo proyectos, no solo mirando videos.',
  ];

  no = [
    'Experiencia previa programando en Java.',
    'Un título universitario en sistemas o afines.',
    'Contactos dentro del rubro tech.',
    'Dinero disponible para pagar por adelantado.',
  ];
}
