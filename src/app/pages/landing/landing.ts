import { Component } from '@angular/core';
import { Nav } from '../../shared/nav/nav';
import { Hero } from '../../sections/hero/hero';
import { Problem } from '../../sections/problem/problem';
import { Solution } from '../../sections/solution/solution';
import { Curriculum } from '../../sections/curriculum/curriculum';
import { HowItWorks } from '../../sections/how-it-works/how-it-works';
import { Payment } from '../../sections/payment/payment';
import { WhyUs } from '../../sections/why-us/why-us';
import { ProfileFit } from '../../sections/profile-fit/profile-fit';
import { Context } from '../../sections/context/context';
import { Cta } from '../../sections/cta/cta';
import { Footer } from '../../sections/footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    Nav,
    Hero,
    Problem,
    Solution,
    Curriculum,
    HowItWorks,
    Payment,
    WhyUs,
    ProfileFit,
    Context,
    Cta,
    Footer,
  ],
  template: `
    <app-nav></app-nav>
    <app-hero></app-hero>
    <app-problem></app-problem>
    <app-solution></app-solution>
    <app-curriculum></app-curriculum>
    <app-how-it-works></app-how-it-works>
    <app-payment></app-payment>
    <app-why-us></app-why-us>
    <app-profile-fit></app-profile-fit>
    <app-context></app-context>
    <app-cta></app-cta>
    <app-footer></app-footer>
  `
})
export class LandingComponent {}
