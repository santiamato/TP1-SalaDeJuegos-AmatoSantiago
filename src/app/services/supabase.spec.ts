import { TestBed } from '@angular/core/testing';

import { SupabaseService as Supabase } from './supabase';

describe('Supabase', () => {
  let service: Supabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
