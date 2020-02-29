import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroComponent } from '../hero/hero.component';
import { Component, Input } from '@angular/core';


describe('Heroes Component Shallow Test', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let heroServiceMock;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
    })
    class FakeHeroComponent {
        @Input() hero: HeroComponent;
    }

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 1, name: 'Wonderful Women', strength: 24 },
            { id: 1, name: 'SuperDude', strength: 55 },
        ]
        heroServiceMock = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHeroes', 'deleteHeroes']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [{ provide: HeroService, useValue: heroServiceMock }],
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });
    it('should set heroes correctly from the service', () => {
        heroServiceMock.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create 1 li for each hero', () => {
        heroServiceMock.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
});
