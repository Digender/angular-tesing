import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

let component: HeroesComponent;
let HEROES;
let mockHeroService;

describe('MessageService', () => {
    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Digender', strength: 10 },
            { id: 2, name: 'Piru', strength: 5 },
            { id: 3, name: 'Chaman', strength: 1 },
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService); // add the mock service
    });


    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
        });

        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            // expect(mockHeroService.deleteHero()).toHaveBeenCalled();// when no parameter
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);  // when parameter is passed
        });
    });
});
