import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventariosService } from 'src/services/inventarios.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-inventory-movements',
  templateUrl: './inventory-movements.component.html',
  styleUrls: ['./inventory-movements.component.scss'],
  preserveWhitespaces: true
})
export class InventoryMovementsComponent implements OnInit {

  constructor(private util: UtilsService,
    private formBuilder: FormBuilder, private inventario: InventariosService) { }

  ngOnInit(): void { }
}
