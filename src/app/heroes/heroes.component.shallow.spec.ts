import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';


describe('Heroes Component Shallow Test', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let heroServiceMock;
    let HEROES;
    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 1, name: 'Wonderful Women', strength: 24 },
            { id: 1, name: 'SuperDude', strength: 55 },
        ]
        heroServiceMock = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHeroes', 'deleteHeroes']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [{ provide: HeroService, useValue: heroServiceMock }],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });
    it('should set heroes correctly from the service', () => {
        heroServiceMock.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });
});
