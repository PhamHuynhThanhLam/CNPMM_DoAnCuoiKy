import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../model/Province';
import { City } from '../../../../model/City';
import { CitiesService } from '../../../../services/cities.service'
import { ProvincesService } from '../../../../services/provinces.service'
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { Motel } from '../../../../model/Motel';
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'
import { MatDialog } from '@angular/material/dialog';
import { DialogThongBaoComponent } from '../dialog-thong-bao/dialog-thong-bao.component';

@Component({
  selector: 'app-thong-tin-co-ban',
  templateUrl: './thong-tin-co-ban.component.html',
  styleUrls: ['./thong-tin-co-ban.component.css']
})
export class ThongTinCoBanComponent implements OnInit {

  nameMotel: string;
  typeMotel: string;
  addressMotel: string;

  cities = new Array<City>();
  city: City;

  provinces = new Array<Province>();
  province: Province;

  phoneMotel;

  motelprevous:Motel;
  checkFirstTime = true;
  isWarning = false;
  constructor(public dialog: MatDialog,private behaviorSubjectClass: BehaviorSubjectClass,private router: Router,private cityService: CitiesService, private provinceService: ProvincesService,public motelService:MotelService) {
    
    this.motelprevous = JSON.parse(localStorage.getItem('PublishMotel'));
    if(this.motelprevous){
      this.nameMotel = this.motelprevous.name;
      this.phoneMotel = this.motelprevous.phone;
      this.addressMotel = this.motelprevous.address;

      this.cityService.getCitys().subscribe(getcity => {
        this.cities.push(getcity.find(a => a.id == this.motelprevous.cityId));
        this.city = getcity.find(a => a.id == this.motelprevous.cityId);
        for(let i=0 ;i< getcity.length;i++){           
          if(this.motelprevous.cityId == getcity[i].id){          
          }
          else{
            this.cities.push(getcity[i]);
          }
        }
        

      })

      this.provinceService.getProvincesByCity(Number(this.motelprevous.cityId)).subscribe((data) => {
        this.provinces.push(data.find(a => a.id == this.motelprevous.provinceId));
        this.province = data.find(a => a.id == this.motelprevous.provinceId);
        for (let i = 0; i < data.length; i++) {
          if(this.motelprevous.provinceId == data[i].id){

          }
          else{
            let province = new Province();
            province.id = data[i].id;
            province.name = data[i].name;
            this.provinces.push(province);
          }           
        }
      })
    }
    else{
      this.getCities();
    }
  }

  ngOnInit(): void {


    this.typeMotel = "Thuê";
  }

  public onClickTypeMotelButton() {
    this.typeMotel = "Thuê"
    this.isWarning = false;

  }

  public onChangeCity(event)
  {
    let value = event.target.value;
    var cityFind = this.cities.find(m => m.id == value);
    this.city = cityFind;
    this.getProvinceById(value);
  }

  public onChangeProvince(event)
  {
    let value = event.target.value;
    var provinceFind = this.provinces.find(m => m.id == value);
    this.province = provinceFind;
  }

  public getProvinceById(ID){
    var id = this.cities.find(m => m.id == ID);
        this.provinces = new Array<Province>();
        const list = this.provinceService.getProvincesByCity(Number(id.id)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            let province = new Province();
            province.id = data[i].id;
            province.name = data[i].name;
            this.provinces.push(province);
          }
      })
  }

  public getCities(){
    this.cityService.getCitys().subscribe(getcity => {
      this.cities = getcity
      if(this.checkFirstTime == true){
        this.provinceService.getProvincesByCity(Number(1)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {           
            let province = new Province();
            province.id = data[i].id;
            province.name = data[i].name;
            if(i == 0){
              this.province = province
            }
            this.provinces.push(province);
          }
        })
        this.checkFirstTime = false
      }
      this.city = this.cities.find(a => a.id == "1")
    })
  }

  public next(){
    if(this.nameMotel && this.typeMotel && this.city.id && this.province.id && this.addressMotel && this.phoneMotel){
      let motel = new Motel(); 
      motel.name = this.nameMotel;
      motel.typemotel = this.typeMotel;
      motel.cityId = this.city.id;
      motel.provinceId = this.province.id;
      motel.address = this.addressMotel;
      motel.phone = this.phoneMotel;
  
      localStorage.setItem('PublishMotel', JSON.stringify(motel));
      this.router.navigateByUrl('/user/thong-tin-nha-tro');
    }
    else{
      this.openDialog();
    }
    
  }

  public prevous(){
    this.router.navigateByUrl('/user/danh-muc');
  }

  public openDialog(): void {
     const dialogRef = this.dialog.open(DialogThongBaoComponent, {
       direction: "ltr",
       width: '400px'
     });
  
     dialogRef.afterClosed().subscribe(() => {
     });
   }
}
