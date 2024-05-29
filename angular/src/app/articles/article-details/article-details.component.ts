import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { ArticleComponent } from '../articles/article.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<ArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public article: any
  ) {}

  ngOnInit() {
    console.log(this.article);
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
