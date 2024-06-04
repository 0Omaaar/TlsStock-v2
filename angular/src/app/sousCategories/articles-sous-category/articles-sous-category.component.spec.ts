import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSousCategoryComponent } from './articles-sous-category.component';

describe('ArticlesSousCategoryComponent', () => {
  let component: ArticlesSousCategoryComponent;
  let fixture: ComponentFixture<ArticlesSousCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesSousCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticlesSousCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
