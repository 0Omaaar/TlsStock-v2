import { TestBed } from '@angular/core/testing';

import { ArticleColorService } from './article-color.service';

describe('ArticleColorService', () => {
  let service: ArticleColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
