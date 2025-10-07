import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoColores } from './juego-colores';

describe('JuegoColores', () => {
  let component: JuegoColores;
  let fixture: ComponentFixture<JuegoColores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoColores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoColores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
