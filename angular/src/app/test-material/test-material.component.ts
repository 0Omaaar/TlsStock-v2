import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
@Component({
  selector: 'app-test-material',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './test-material.component.html',
  styleUrl: './test-material.component.scss'
})
export class TestMaterialComponent {

}
