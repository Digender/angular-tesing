import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroComponent } from '../hero/hero.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';


describe('Heroes Component deep Test', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let heroServiceMock;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 1, name: 'Wonderful Women', strength: 24 },
            { id: 1, name: 'SuperDude', strength: 55 },
        ],
        heroServiceMock = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHeroes', 'deleteHeroes']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent],
            providers: [{ provide: HeroService, useValue: heroServiceMock }],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });
    it('should render each hero as a HeroComponent', () => {
        heroServiceMock.getHeroes.and.returnValue(of(HEROES));
        //  run ngOnInit()
        fixture.detectChanges();
        const theroDE = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(theroDE.length).toBe(3);
        for (let i = 0; i < theroDE.length; i++) {
            expect(theroDE[i].componentInstance.hero.name).toEqual(HEROES[i].name);
        }
    });
});
