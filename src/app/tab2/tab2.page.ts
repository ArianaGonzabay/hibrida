import { Component } from '@angular/core';
/*Importe los componentes de la UI*/
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonTextarea, IonButton, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
/* Importe el módulo para formularios reactivos */
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
/* Importe el servicio */
import { ProviderService } from '../services/provider.service';

//Decorator del componente
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonTextarea,IonButton,
    IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  /*Instancie un formulario*/
  myForm: FormGroup = new FormGroup({
    score: new FormControl("", Validators.required),
    opinion: new FormControl("", Validators.required)
  });
  

  // /*El método onSubmit para enviar los datos del formulario mediante el servicio*/
  // onSubmit() {
  //   console.log(this.myForm.value);
  //   alert(this.myForm.controls["score"].value)
  //   this.myForm.reset()
  // }

  /* Nombre de la colección */
  collectionName = 'reviews';

  /*Arreglo con datos locales*/
  dataList: any[] = [];

  /* Inyecte la dependencia a Firestore */
  constructor(private providerService: ProviderService) { }

   /* El método onSubmit para enviar los datos del formulario mediante el servicio */
   onSubmit() {
    this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
        this.myForm.reset()
    });
  }

  /*Al inicializar, carga los datos*/
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
      this.dataList = data;
    });
  }

}
