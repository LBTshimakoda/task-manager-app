import { TestBed } from '@angular/core/testing';

import { TaskService } from './task';  // Change Task to TaskService

describe('TaskService', () => {  // Change Task to TaskService
  let service: TaskService;      // Change Task to TaskService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);  // Change Task to TaskService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});