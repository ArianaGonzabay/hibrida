import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonTextarea, IonButton, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../services/provider.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonTextarea, IonButton,
    IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent
  ]
})
export class Tab2Page {
  myForm: FormGroup = new FormGroup({
    score: new FormControl("", Validators.required),
    opinion: new FormControl("", Validators.required)
  });

  collectionName = 'reviews';
  dataList: any[] = [];

  constructor(private providerService: ProviderService) { }

  onSubmit() {
    this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
        this.myForm.reset()
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
      this.dataList = data;
    });
  }

  calcularPorcentaje(tipo: string): number {
    if (!this.dataList || this.dataList.length === 0) return 0;
    
    const cantidad = this.dataList.filter(item => item.score === tipo).length;
    const porcentaje = (cantidad / this.dataList.length) * 100;
    return Math.round(porcentaje);
  }

  // Definir la función trackByIndex para mejorar el rendimiento en listas con *ngFor
  trackByIndex(index: number, item: any): number {
    return index; // Devuelve el índice como clave única
  }
}
