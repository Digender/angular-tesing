import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
  const mockMsgService = jasmine.createSpyObj('MessageService', ['add']);
  let httpTestingController: HttpTestingController;
  let service;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMsgService },
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MessageService);
  });

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      service.getHero(4).subscribe();
      // service.getHero(3).subscribe(); wrong url not expected
      const req = httpTestingController.expectOne('/api/heroes/4');
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });

      httpTestingController.verify(); // used to check if multiple calls are made
    });
  });
});
