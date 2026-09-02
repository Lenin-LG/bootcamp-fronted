import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us',
  imports: [],
  templateUrl: './why-us.html',
  styleUrl: './why-us.css',
})
export class WhyUs {
  rows = [
    { title: 'Mentores activos en la industria', desc: 'Aprendes con developers que trabajan hoy en empresas reales, no solo con teoría de manual.' },
    { title: 'Proyectos para portafolio real', desc: 'Construyes APIs y microservicios que puedes mostrar en una entrevista técnica.' },
    { title: 'Comunidad y networking', desc: 'Compañeros, alumni y referidos que te abren puertas dentro del rubro tech.' },
    { title: 'Soporte hasta que consigas empleo', desc: 'CV, LinkedIn, simulacros de entrevista y postulaciones guiadas, sin costo extra.' },
  ];
}
