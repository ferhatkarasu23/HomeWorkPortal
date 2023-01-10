import { Component, OnInit } from '@angular/core';
import { FbServiceService } from './services/fb-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  uye!:any;
  constructor(
    public fbService: FbServiceService
  ) {
    this.uye = JSON.parse(localStorage.getItem('user') || '{}');
   }
  ngOnInit(): void {
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }
}
