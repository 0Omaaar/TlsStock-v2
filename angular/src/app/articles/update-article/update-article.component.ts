import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-update-article',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.scss'
})
export class UpdateArticleComponent {

  updateArticleForm!: FormGroup;
  article: any; 

  constructor(private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    const articleId = this.activatedRoute.snapshot.params['id'];
    this.findArticle(articleId);
  }

  findArticle(id: number){
    this.articleService.getArticle(id).subscribe(res => {
      if(res && res.id !== null){
        this.article = res;

        this.updateArticleForm = this.fb.group({
          code: [this.article.code, [Validators.required]],
          name: [this.article.name, [Validators.required]],
          description: [this.article.description, [Validators.required]],
          quantity: [this.article.quantity, [Validators.required]],
          categoryId: [this.article.categoryId, [Validators.required]],
        })
      }
    })
  }

}
