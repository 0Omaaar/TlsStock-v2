import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ClientService } from 'src/app/services/clients/client.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule, MatTableModule, MatPaginatorModule, RouterModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('close') addClose!: ElementRef;

  constructor(
    private clientService: ClientService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  clients: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'name', 'email', 'phone', 'nbOrders', 'actions'];
  searchForm!: FormGroup;
  addForm!: FormGroup;
  updateForm!: FormGroup;
  client: any;
  clientName: any;
  orders: any = [];

  ngOnInit() {
    this.getClients();

    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getClients() {
    this.clientService.getClients().subscribe(res => {
      if (res != null) {
        this.clients = res;
        this.dataSource.data = res;
      }
    });
  }


  getOrdersByClient(clientId: number) {
    this.clientService.getOrdersByClient(clientId).subscribe(res => {
      if (res != null) {
        this.orders = res;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addClient() {
    const client = this.addForm.value;
    if (this.addForm.valid) {
      this.clientService.addClient(client).subscribe((res) => {
        if (res != null) {
          this.snackbar.open('Client Ajoute Avec Succes !', 'Close', {
            duration: 5000
          });
          this.getClients();
          this.addClose.nativeElement.click();
        } else {
          this.snackbar.open('Erreur Survenue !', 'Close', {
            duration: 5000
          });
        }
      });
    }
  }

  editClient(clientDto: any) {
    this.client = clientDto;
    const id = clientDto.id;
    this.updateForm = this.fb.group({
      id: [id],
      name: [this.client.name, [Validators.required]],
      email: [this.client.email, [Validators.required]],
      phone: [this.client.phone, [Validators.required]],
    })
  }

  updateClient() {
    const client = this.updateForm.value;
    if (this.updateForm.valid) {
      this.clientService.updateClient(client).subscribe(res => {
        if (res.id != null) {
          this.snackbar.open("Client Modifie Avec Succes !", 'Close', {
            duration: 5000
          })
          this.getClients();
          this.closeButton.nativeElement.click();
        }
      })
    } else {
      this.snackbar.open("Erreur Survenue !", 'Close', {
        duration: 5000
      })
    }
  }

  storeClientToDelete(clientDto: any) {
    this.client = clientDto;
    this.deleteClient();
  }

  deleteClient() {
    this.clientService.deleteClient(this.client).subscribe((res) => {
      if (res) {
        this.closeButton.nativeElement.click();
        this.getClients();
        this.snackbar.open('Client Supprime Avec Succes !', 'Close', {
          duration: 5000
        });
      } else {
        this.snackbar.open('Erreur Survenue !', 'Close', {
          duration: 5000
        });
      }
    });
  }
}
