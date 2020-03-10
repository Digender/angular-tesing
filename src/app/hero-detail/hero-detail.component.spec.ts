import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { of } from 'rxjs';
import { setTimeout } from 'timers';

describe('Hero Detail Component', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let heroServiceMock;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 1, name: 'Wonderful Women', strength: 24 },
            { id: 1, name: 'SuperDude', strength: 55 },
        ],
            heroServiceMock = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHeroes', 'deleteHeroes', 'updateHero']);
        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            providers: [{ provide: HeroService, useValue: heroServiceMock }],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
    });

    /* kit ('should call update hero when save is called', (done) => {
        heroServiceMock.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        setTimeout(() => {
            expect(heroServiceMock.updateHero).toHaveBeenCalled();
            done();
        }, 300);
    }); */
});
