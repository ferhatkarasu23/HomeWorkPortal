import { Uye } from './../models/Uye';
import { Injectable } from '@angular/core';
import { Odev } from '../models/Odev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = "http://localhost:3000/";
  public aktifUye: Uye = new Uye();;
  constructor(
    public http: HttpClient
  ) { }
  /* Odev servis başla*/

  OturumAc(mail: string, parola: string) {
    return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola);
  }
  OturumKontrol() {
    if (localStorage.getItem("adsoyad")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  AktifUyeBilgi() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }
  OdevListele() {
    return this.http.get<Odev[]>(this.apiUrl + "homeworks");
  }
  OdevById(id: number) {
    return this.http.get<Odev>(this.apiUrl + "homeworks/" + id);
  }
  OdevEkle(odev: Odev) {
    return this.http.post(this.apiUrl + "homeworks/", odev);
  }
  OdevDuzenle(odev: Odev) {
    return this.http.put(this.apiUrl + "homeworks/" + odev.id, odev);
  }
  OdevSil(id: number) {
    return this.http.delete(this.apiUrl + "homeworks/" + id);
  }
  /* Odev servis bitiş*/

  /* Uye servis başla*/

  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "users");
  }
  UyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + "users/" + id);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "users/", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "users/" + uye.id, uye);
  }
  UyeSil(id: number) {
    return this.http.delete(this.apiUrl + "users/" + id);
  }
  /* Uye servis bitiş*/
}
