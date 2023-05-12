// Importa los módulos necesarios
import { Component } from '@angular/core';
import { ScrollService } from './scroll.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portofolio-diego';
  constructor(public translate: TranslateService, private scrollService: ScrollService){
    this.translate.addLangs(["es", "en"]);
    this.translate.setDefaultLang("en");
  }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "arrows": true,
    "responsive": [
      {
        "breakpoint": 770,
        "settings": {
          "slidesToShow": 2,
        }
      },
      {
        "breakpoint": 650,
          "settings": {
            "slidesToShow": 1,
          }
      }
    ]
  };

  slidesDrupal = [
      {img: "../assets/img/benidorm.png", title: "Benidorm", href: "https://www.benidorm.org"},
      {img: "../assets/img/daimiel.png", title: "Daimiel", href: "https://www.daimiel.es"},
      {img: "../assets/img/edificaciones-caballero.png", title: "Edificaciones Cabellero", href: "https://www.edificacionescaballero.com"},
      {img: "../assets/img/qh.png", title: "QH", href: "https://www.reconocimientoqh.com"},
      {img: "../assets/img/carbrimo.png", title: "Carbrimo", href: "https://www.carbrimo.com"},
      {img: "../assets/img/abacid.png", title: "Abacid", href: "https://abacid.es/inicio"}
  ];
  slidesWordpress = [
    {img: "../assets/img/bogarde.png", title: "Bogarve", href: "https://bogarve1915.com"},
    {img: "../assets/img/garcia-baquero.png", title: "Garcia Baquero", href: "https://www.garciabaquero.com"},
    {img: "../assets/img/tecnove.png", title: "Tecnove", href: "https://www.tecnove.com"},
    {img: "../assets/img/qh.png", title: "Chiribita", href: "https://www.chiribitaoficial.com"},
  ];
  slidesAngular = [
    {img: "../assets/img/gicoop.png", title: "Gicoop", href: "https://app.gicoop.es/"},
    {img: "../assets/img/Portfolio.PNG", title: "Portfolio"}
  ];
}
