import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as firebase from 'firebase';

import { Storage } from '@ionic/storage';

import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  formEncuesta : FormGroup
  ref = firebase.database().ref()
  key = 0
  guardado = false

  constructor(
    private formBuilder: FormBuilder,
    private modal : ModalController,
    private http : HttpClient,
    private storage: Storage, 
    private network : Network,
    public toastController: ToastController,

  ){
      
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.presentToast("Conexión perdida, los datos se guardaran cuando se recupere la conexión")
      });

      let connectSubscription = this.network.onConnect().subscribe(() => {
        console.log('network connected!');

        setTimeout(() => {
          if (this.network.type === 'wifi') {
            if(this.key > 0){
              if(this.guardado == false){
                this.storage.forEach(user =>{
                  console.log(user)
                  let insert = this.ref.push();
                  insert.set(user);
                })
                this.guardado = true
                this.key = 0
                this.storage.clear()
                this.presentToast("Sincronizando datos", true)
              }
              
            }else{
              //console.log("NEEEEEEEL")
            }
            //console.log('we got a wifi connection, woohoo!');
            this.presentToast("Conexión establecida")
          }
        }, 3000);
      });

      
  }
  ngOnInit(): void {
    this.formEncuesta = this.formBuilder.group({
      'name': ['', Validators.required],
      'age' : ['', Validators.required],
      'sex' : ['', Validators.required],
      'ocupation' : ['', Validators.required],
      'city' : ['', Validators.required],
    })
  }

  async presentToast(data, top = false) {
    let toast = await this.toastController.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
    if(top == true){
        toast = await this.toastController.create({
        message: data,
        duration: 3000,
        position: 'bottom'
      });
    }

    
    toast.present();
  }

  guardar(){
    if(this.network.type == 'wifi'){
      console.log("FORM: ", this.formEncuesta.value)
      let insert = this.ref.push();
      insert.set(this.formEncuesta.value);
      this.formEncuesta.reset()
      this.presentToast("Datos guardados")
    }else{
      let local = {
        'name' : this.formEncuesta.get('name').value,
        'age' : this.formEncuesta.get('age').value,
        'sex' : this.formEncuesta.get('sex').value,
        'ocupation': this.formEncuesta.get('ocupation').value,
        'city' : this.formEncuesta.get('city').value

      }
      this.storage.set(this.key.toString(), local)
      this.presentToast("Datos guardados localmente, se sincronizara cuando se recupere la conexión")
      this.key ++;
      this.guardado = false
    }
  }
}
