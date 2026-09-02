import { Component } from '@angular/core';

@Component({
  selector: 'app-solution',
  imports: [],
  templateUrl: './solution.html',
  styleUrl: './solution.css',
})
export class Solution {
  stats = [
    { num: '2', label: 'meses intensivos, clases en vivo' },
    { num: '100%', label: 'práctico, con proyectos tipo empresa' },
    { num: '0', label: 'pagas por adelantado' },
  ];
}
