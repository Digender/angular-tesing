import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { HeroComponent } from '../hero/hero.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


describe('Heroes Component deep Test', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let heroServiceMock;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 1, name: 'Wonderful Women4', strength: 24 },
            { id: 1, name: 'SuperDude', strength: 55 },
        ],
        heroServiceMock = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHeroes', 'deleteHeroes']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent],
            providers: [
                { provide: HeroService, useValue: heroServiceMock }
            ],
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

    it ('should call heroService.deleteHero when delete button is clicked', () => {
        spyOn(fixture.componentInstance, 'delete');
        heroServiceMock.getHeroes.and.returnValue(of(HEROES));
        //  run ngOnInit()
        fixture.detectChanges();
        const [heroComponent] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponent.query(By.css('button'))
            .triggerEventHandler('click', { stopPropagation: () => {} });

        // heroComponents.triggerEventHandler('delete', null);
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it ('should call heroService.deleteHero when delete button is clicked from child component', () => {
        spyOn(fixture.componentInstance, 'delete');
        heroServiceMock.getHeroes.and.returnValue(of(HEROES));
        //  run ngOnInit()
        fixture.detectChanges();
        const [heroComponent] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponent.componentInstance).delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });
});
