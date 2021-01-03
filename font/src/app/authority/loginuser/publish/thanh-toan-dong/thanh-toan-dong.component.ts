import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Motel } from '../../../../model/Motel';
import { Image } from '../../../../model/Image';
import { Account } from '../../../../model/Account';
import { MotelService } from '../../../../services/motel.service';
import { ServicePriceService } from '../../../../services/service-price.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService} from '../../../../services/authentication.service'

import { Router } from '@angular/router';
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'
import { NewType } from 'src/app/model/NewType';
import { TypeofnewService } from 'src/app/services/newstype.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { City } from 'src/app/model/City';
import { Province } from 'src/app/model/Province';

@Component({
  selector: 'app-thanh-toan-dong',
  templateUrl: './thanh-toan-dong.component.html',
  styleUrls: ['./thanh-toan-dong.component.css']
})
export class ThanhToanDongComponent implements OnInit {

  //Lấy data
  newTypeMotel;
  imageMotels: File [] = [];
  saveNewMotel: Motel;
  imagesURLFirebare:Array<string> = [];
  addimages:Image;
  currentAccount:Account;
  
  
  resultSaveMotel:Motel;

  money:string;
  checkImage = false;
  loadDataToSee: Motel;
  loadDataType:string = "";
  loadDataCity:string = "";
  loadDataProvince:string = "";
  constructor(private cityService: CitiesService, private provinceService: ProvincesService,private typeservice:TypeofnewService,private behaviorSubjectClass: BehaviorSubjectClass,private priceService: ServicePriceService,private router: Router,private authenticationService: AuthenticationService,private _sanitizer: DomSanitizer,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {
  
    this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.loadData();
    this.money = localStorage.getItem('totalMoney'); 
    if(this.currentAccount.user.userImage != null)
    {
      this.checkImage = true;
    }
  }

  

  ngOnInit(): void {
    
  }

  public loadData(){
    this.loadDataToSee = JSON.parse(localStorage.getItem('PublishMotel'));
    console.log(this.loadDataToSee)
    this.behaviorSubjectClass.getNewTypes().subscribe(getnewtypemotel => {
      this.loadDataType = getnewtypemotel.name
    });
    this.cityService.getCityFromId(Number(this.loadDataToSee.cityId)).subscribe(getcity => {
      this.loadDataCity = getcity.name;

    })
    this.provinceService.getProvinceById(Number(this.loadDataToSee.provinceId)).subscribe(getprovince => {
      this.loadDataProvince = getprovince.name;

    })
  }

  public prevous(){
    this.router.navigateByUrl('/user/goi-thanh-toan');
  }

   //Lưu tiền motel
   public loadImage = async () => {
    for(let i=0; i< this.imageMotels.length;i++){
      var temp = this.imageMotels.length;
      var filePath = `${this.saveNewMotel.name}/${this.imageMotels[i].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.imageMotels[i]).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imagesURLFirebare.push(url);
            if(Number(this.imageMotels.length) == Number(this.imagesURLFirebare.length)){
              this.save();
            }
          })
        })
      ) .subscribe();
    } 
    
  }

  public save = async () => {
    try 
    {
      console.log(this.imagesURLFirebare.length);
      console.log(this.currentAccount.user.id);
      if(this.imagesURLFirebare.length){
        this.saveNewMotel.detail.typeofnewId = this.newTypeMotel.id;  
        this.saveNewMotel.userId = this.currentAccount.user.id;
        this.saveNewMotel.status = "Tin đang ẩn";
        //this.motelnew.typeservice = this.new;
        //this.motelnew.time = this.datatime;
        
        let Finall:Image[] = [];
        for(let i=0;i<this.imagesURLFirebare.length;i++)
        {
          this.addimages = {
            imageMotel: this.imagesURLFirebare[i]
          }
          Finall.push(this.addimages);
        }
        console.log(Finall);
        this.saveNewMotel.images = Finall;
        console.log( this.saveNewMotel.images);
        console.log( this.saveNewMotel);
        this.motelService.postMotel(this.saveNewMotel).subscribe(newMotel => {
          this.resultSaveMotel = newMotel;
          //console.log(this.resultSaveMotel);
        });

        alert('Đăng tin thành công');
        localStorage.removeItem('totalMoney'); 
        var file: File[];
        var newType: NewType;
        this.behaviorSubjectClass.setDataImages(file);
        localStorage.removeItem('PublishMotel')
        this.behaviorSubjectClass.setNewTypes(newType);
        this.router.navigateByUrl('/user/danh-muc');
      }
      else{
        alert('Đăng tin thất bại');
      }
    }
    catch (e) {
      alert('Add failed');
    }
  }
  public onSubmit = async () => {
    this.behaviorSubjectClass.getDataImages().subscribe(getimagemotel => this.imageMotels = getimagemotel);
    this.behaviorSubjectClass.getNewTypes().subscribe(getnewtypemotel => this.newTypeMotel = getnewtypemotel);
    this.saveNewMotel = JSON.parse(localStorage.getItem('PublishMotel'));
    this.loadImage();
  };
  
}
