import { Sonuc } from '../../models/Sonuc';
import { MytoastService } from '../../services/mytoast.service';
import { Odev } from '../../models/Odev';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { FbServiceService } from 'src/app/services/fb-service.service';

@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.scss']
})
export class OdevComponent implements OnInit {
  odevler!: Odev[];
  modal!: Modal;
  modalBaslik: string = "";
  secOdev!: Odev;
  uye!:any;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adi: new FormControl(),
    icerigi:new FormControl(),
    uyeAdi:new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public fbService: FbServiceService,
    public toast: MytoastService
  ) { 
    this.uye = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit() {
    this.OdevListele();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ödev Ekle";
    this.modal.show();
  }
  Duzenle(odev: Odev, el: HTMLElement) {
    this.frm.patchValue(odev);
    this.modalBaslik = "Ödev Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(odev: Odev, el: HTMLElement) {
    this.secOdev = odev;
    this.modalBaslik = "Ödev Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  OdevListele(){
    this.fbService.getOdevler().snapshotChanges().subscribe(data =>{
      this.odevler=[];
      data.forEach(odev =>{
        const o ={...odev.payload.toJSON(),key:odev.key};
        this.odevler.push(o as Odev);
      })
    })
  }
  OdevEkleDuzenle() {
    var odev: Odev = this.frm.value
    var tarih = new Date();
    if (!odev.uyeAdi) {
      odev.id = this.uye.uid;
      odev.uyeAdi = this.uye.email;
      odev.kaytarih = tarih.getTime().toString();
      odev.duztarih = tarih.getTime().toString();
      this.fbService.setOdev(odev).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ödev Eklendi";
        this.toast.ToastUygula(this.sonuc);
        this.OdevListele();
        this.modal.toggle();
    });  
    } else {
      odev.duztarih = tarih.getTime().toString();
      this.fbService.updateOdev(odev).then(d => {        
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ödev Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.OdevListele();
        this.modal.toggle();
      });
    }

  }
  OdevSil() {
    this.fbService.deleteOdev(this.secOdev.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Odev Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.OdevListele();
      this.modal.toggle();
    });
  }
}
