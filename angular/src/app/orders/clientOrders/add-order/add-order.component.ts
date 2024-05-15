import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { ClientService } from 'src/app/services/clients/client.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [SharedModule, FormsModule, MatIconModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent {
  categories: any;
  clients: any;
  category: any;
  articles: any;
  client: any = {};
  selectedClient: any = null;
  orderCode: string = '';

  currentDate = new Date();
  constructor(private categorieService: CategoryService, 
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  // orderCode: string = this.client.name +"/"+ this.currentDate; 

  getCategories() {
    this.categorieService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }


  displayClient(event: Event){
    const selectedClient = event.target as HTMLSelectElement;
    const clientId = Number(selectedClient.value);
  }
  getClients(){
    this.clientService.getClients().subscribe(res => {
      this.clients = res;
    })
  }

  getArticlesByCategory(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = Number(selectElement.value);
    this.categorieService.getArticlesByCategoryId(categoryId).subscribe((res) => {
      if(res != null){
        this.articles = res.map((element: { image: any; processedImg: string; byteImage: string }) => {
          if (element.byteImage != null) {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
          }
          return element;
        });
      }
      else{
        this.snackBar.open("Cette Categorie n'as pas d'articles", 'Close', {
          duration: 5000
        });
      }
    });
  }

  ngOnInit() {
    this.getCategories();
    this.getClients();
  }
}
