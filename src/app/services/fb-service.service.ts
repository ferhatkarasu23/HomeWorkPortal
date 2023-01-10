import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Odev } from '../models/Odev';
import { Uye } from '../models/Uye';

@Injectable({
  providedIn: 'root'
})
export class FbServiceService {

  admin:boolean=false;
  signupMail="";
  private dbOdevler="/Odevler";
  private dbUyeler="/Uyeler"
  odevRef:AngularFireList<Odev>;
  uyeRef:AngularFireList<Uye>;
  constructor(
    public db:AngularFireDatabase,
    public afAuth:AngularFireAuth
  ) { 
    this.odevRef = db.list(this.dbOdevler);
    this.uyeRef = db.list(this.dbUyeler);
  }

  login(email: string, pass: string) {
    return  this.afAuth.signInWithEmailAndPassword(email, pass);
  }
  logOut(){
    localStorage.removeItem("user");
   return this.afAuth.signOut();
  }
  isLogin(){
    if(localStorage.getItem('user')){
      return true;
    }else{
      return false;
    }
  }
  signUp(user:Uye){
    return this.afAuth.createUserWithEmailAndPassword(user.mail, user.parola);
  }
  userAdd(user:Uye){
    return this.uyeRef.push(user);
  }
  getOdevlerByUid(uid:string){
    return this.db.list("/Odevler", q => q.orderByChild("uid").equalTo(uid));
  }
  getOdevByKey(key:string){
  return this.db.object("/Odevler/" + key);
  }
  getOdevler(){
    return this.odevRef;
  }
  setOdev(odev:Odev){
    return this.odevRef.push(odev);
  }
  updateOdev(odev:Odev){
    return this.odevRef.update(odev.id,odev);
  }
  deleteOdev(key:string){
    return this.odevRef.remove(key);
  }
  getUyeler(){
    return this.uyeRef;
  }
  setUye(uye:Uye){
    return this.uyeRef.push(uye);
  }
  updateUye(uye:Uye){
    return this.uyeRef.update(uye.id,uye);
  }
  deleteUye(key:string){
    return this.uyeRef.remove(key);
  }
  
}
