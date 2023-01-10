import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { MytoastService } from 'src/app/services/mytoast.service';
import { FbServiceService } from 'src/app/services/fb-service.service';
import {v4 as uuidv4} from 'uuid'

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {

  
  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
  uye!:any;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adsoyad: new FormControl(),
    mail: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public fbServis: FbServiceService,
    public toast: MytoastService
  ) {
    this.uye = JSON.parse(localStorage.getItem('user')!) 
    
  }

  
  ngOnInit() {
    this.UyeListele();

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
    this.fbServis.getUyeler().snapshotChanges().subscribe(data =>{
      this.uyeler=[];
      data.forEach(uye =>{
        const u ={...uye.payload.toJSON(),key:uye.key};
        this.uyeler.push(u as Uye);
      })
    })
  }
  
  UyeEkleDuzenle() {
    let myuuid = uuidv4();
    var uye: Uye = this.frm.value
    var tarih = new Date();
    if (!uye.id) {
      var filtre = this.uyeler.filter(s => s.mail == uye.mail);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen E-Posta Adresi Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        uye.kaytarih = tarih.getTime().toString();
        uye.duztarih = tarih.getTime().toString();
        uye.id = myuuid;
        console.log(uye);
        this.fbServis.setUye(uye).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Uye Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.UyeListele();
          this.modal.toggle();
        });
      }
    } else {
      uye.duztarih = tarih.getTime().toString();
      this.fbServis.updateUye(uye).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Üye Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.UyeListele();
        this.modal.toggle();
      });
    }

  }
  UyeSil() {
    this.fbServis.deleteUye(this.secUye.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.UyeListele();
      this.modal.toggle();
    });
  }
}
