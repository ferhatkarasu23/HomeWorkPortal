import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { Component, OnInit } from '@angular/core';
import { FbServiceService } from 'src/app/services/fb-service.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sonuc: Sonuc = new Sonuc();

  constructor(
    public fbService: FbServiceService,
    public toast: MytoastService,
    public router:Router
  ) { }

  ngOnInit() {
  }
  async oturumAc(user: string, pass: string) {
    try {
     await this.fbService.login(user, pass).then(x=>
        {localStorage.setItem("user",JSON.stringify(x.user))
        let userJS = JSON.parse(localStorage.getItem('user')!);
        if(userJS){
          if(userJS.email == "admin@gmail.com"){
            this.fbService.admin=true;
          }
          this.sonuc.islem=true;
          this.sonuc.mesaj="Girişiniz başarılı!";
        }});
      timer(3000).subscribe(x => this.router.navigateByUrl('/'));
    } catch (e) {
      this.sonuc.islem=false;
      this.sonuc.mesaj="Şifre veya kullanıcı adı eksik veya hatalı girilmiştir !";
    }
  }
}
