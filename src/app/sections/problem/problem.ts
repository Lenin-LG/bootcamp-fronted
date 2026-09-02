import { Component } from '@angular/core';

@Component({
  selector: 'app-problem',
  imports: [],
  templateUrl: './problem.html',
  styleUrl: './problem.css',
})
export class Problem {
  items = [
    {
      title: 'Pagas todo por adelantado',
      desc: 'Aunque no sepas si el bootcamp realmente te va a conseguir trabajo.',
    },
    {
      title: 'Contenido desactualizado',
      desc: 'Te enseñan teoría que ninguna empresa pide en una entrevista real.',
    },
    {
      title: 'Nadie te acompaña al final',
      desc: 'Terminas el curso solo, sin apoyo para armar tu CV o postular.',
    },
  ];
}
