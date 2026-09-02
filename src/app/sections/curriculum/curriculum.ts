import { Component } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  imports: [],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.css',
})
export class Curriculum {
  modules = [
    { title: 'Java Core & POO', desc: 'Sintaxis, colecciones, streams y buenas prácticas de código.' },
    { title: 'Spring Boot', desc: 'APIs REST robustas, seguridad, testing y persistencia de datos.' },
    { title: 'Spring Cloud & Microservicios', desc: 'Arquitecturas distribuidas, gateway, config server, resiliencia.' },
    { title: 'Docker & Contenedores', desc: 'Empaqueta y despliega tus servicios como en un equipo real.' },
    { title: 'Fundamentos Cloud (AWS)', desc: 'Despliegue, servicios gestionados y buenas prácticas en la nube.' },
    { title: 'SQL, Git & GitHub', desc: 'Bases de datos relacionales y control de versiones en equipo.' },
  ];
}
