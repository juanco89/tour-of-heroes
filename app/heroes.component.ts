import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { };

  ngOnInit(): void {
    /*this.heroService.getHeroes().then(
      heroes => this.heroes = heroes
    );*/
    
    new Promise<Hero[]>(
      resolve => 
        setTimeout(resolve, 2000)
      ).then( () =>
        this.heroService.getHeroes().then(
          heroes => this.heroes = heroes
        )
      );
  };

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };

  heroes: Hero[];

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.create(name)
      .then(hero =>  {
          this.heroes.push(hero);
          this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

}
