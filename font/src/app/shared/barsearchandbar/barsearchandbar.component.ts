import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CitiesService } from '../../services/cities.service'
import { City } from '../../model/City';
import { NewType } from '../../model/NewType';
import { Province } from '../../model/Province';
import { Motel } from '../../model/Motel';
import { ProvincesService } from '../../services/provinces.service'
import { BehaviorSubjectClass } from '../../services/behaviorsubject'
import { TypeofnewService } from '../../services/newstype.service'
import { MotelService } from '../../services/motel.service'
import { Router,ActivatedRoute } from '@angular/router';
import { Detail } from 'src/app/model/Detail';
import { PriceSearch } from 'src/app/model/PriceSearch';
import { PriceSearchService } from 'src/app/services/price-search.service';
import { Location, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-barsearchandbar',
  templateUrl: './barsearchandbar.component.html',
  styleUrls: ['./barsearchandbar.component.css']
})
export class BarsearchandbarComponent implements OnInit {

  // Danh sách city và tên city
  cities = new Array<City>();
  city;
  // Danh sách province và tên province
  provinces = new Array<Province>();
  province;
  // Danh sách province và tên province
  newTypes = new Array<NewType>();
  newType;
  // Danh sách pricesearch và tên pricesearch
  priceSearchs = new Array<PriceSearch>();
  priceSearch;
  
  searchname;
  //load tên trên thanh tophead
  nametophead;
  name;
  
  searchtext;
  @Output() newTypeSearch: EventEmitter<string> = new EventEmitter<string>();
  constructor(public location: Location,private priceSearchServer:PriceSearchService,private behaviorSubjectClass:BehaviorSubjectClass,private router: Router,public activerouter:ActivatedRoute,private motelService: MotelService,private cityService: CitiesService, private provinceService: ProvincesService, private typeservice:TypeofnewService) {
    this.getPrices();
    this.getCities();
    this.getNewTypes();

    if(localStorage.getItem('province')){
      this.cityService.getCitys().subscribe(getcity => {
        var id = getcity.find(m => m.name == localStorage.getItem('city'));
        console.log(id)
        this.provinceService.getProvincesByCity(Number(id.id)).subscribe( data => this.provinces = data)
      })

    }

  }

  ngOnInit(): void {

    this.city = "Toàn quốc";
    this.province = "Tất cả";

    this.newType = "Phòng trọ, nhà cho thuê"
    this.priceSearch = "Giá thuê"
    
    if(localStorage.getItem('city') != "Tất cả")
    {
      this.city = localStorage.getItem('city');
      this.getProvinces();
    }
    else{
      this.city = "Tất cả";
    }

    if(localStorage.getItem('province') != "Tất cả"){
      this.province = localStorage.getItem('province');
    }
    else{
      this.province = "Tất cả";
    }

    if(Number(localStorage.getItem('priceid')) == 0){
      this.priceSearch = "Tất cả";
    }

    if(Number(localStorage.getItem('priceid')) == 1){
      this.priceSearch = "Dưới 1 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 2){
      this.priceSearch = "1 triệu - 2 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 3){
      this.priceSearch = "2 triệu - 3 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 4){
      this.priceSearch = "3 triệu - 5 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 5){
      this.priceSearch = "5 triệu - 7 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 6){
      this.priceSearch = "7 triệu - 10 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 7){
      this.priceSearch = "7 triệu - 10 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 8){
      this.priceSearch = "10 triệu - 15 triệu";
    }
    
    this.activerouter.data.subscribe(data => {
      this.name = data.kind;
    })
    if(this.name == "cho-thue-nha-tro"){
      this.nametophead = "Cho thuê phòng trọ, nhà trọ số 1 Việt Nam";
      this.newType = "Phòng trọ, nhà trọ"
    }
    if(this.name == "nha-cho-thue"){
      this.nametophead = "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2020";
      this.newType = "Nhà thuê nguyên căn"

    }
    if(this.name == "cho-thue-can-ho"){
      this.nametophead = "Cho Thuê Căn Hộ Chung Cư Mini, Căn Hộ Dịch Vụ, Giá Rẻ - Mới Nhất 2020";
      this.newType = "Cho thuê căn hộ"

    }
    if(this.name == "cho-thue-mat-bang"){
      this.nametophead = "Cho Thuê Mặt Bằng, Cho Thuê Văn Phòng, Cửa Hàng, Kiot";

      this.newType = "Cho thuê mặt bằng"
    }
    if(this.name == "tim-nguoi-o-ghep-cap"){
      this.nametophead = "Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép";
      this.newType = "Tìm người ở ghép"
    }
  }

 
  public onChoiceCity(name) {
    this.city = name;
    console.log(name)
    localStorage.removeItem('city');
    localStorage.setItem('city', name);
    console.log(localStorage.getItem('city'))
    this.getProvinces();
  }

  public onChoiceProvince(name) {
    this.province = name;
    localStorage.removeItem('province');
    localStorage.setItem('province', name);
  }

  public onChoiceNewtype(name) {
    this.newType = name;
  }

  public onChoicePriceSearch(price) {
    this.priceSearch = price.number;
    localStorage.removeItem('priceid');
    localStorage.setItem('priceid', price.id);
  }
  
  public getProvinces(){
    if(this.city == ""){
      alert("Chọn thành phố trước");
    }
    else{
      if(localStorage.getItem('city') != "Tất cả"){
        this.cityService.getCityFromName(localStorage.getItem('city')).subscribe(data => {
          this.provinceService.getProvincesByCity(Number(data.id)).subscribe( data => {
            //this.provinces = data
            var provinceZero = new Province();
            var number = 0;
            provinceZero.id = number.toString();
            provinceZero.name = "Tất cả";
            provinceZero.cityid = number.toString();
    
            var provinceNew : Province[] = [];
            this.provinces = provinceNew;
            this.province = "Tất cả"
            this.provinces.push(provinceZero);
            for(let i=0;i<data.length;i++){
              this.provinces.push(data[i])
            }
          })
        })
      }
      else{
        var id = this.cities.find(m => m.name == this.city);
        console.log(id)
        this.provinceService.getProvincesByCity(Number(id.id)).subscribe( data => {
        //this.provinces = data
        var provinceZero = new Province();
        var number = 0;
        provinceZero.id = number.toString();
        provinceZero.name = "Tất cả";
        provinceZero.cityid = number.toString();

        var provinceNew : Province[] = [];
        this.provinces = provinceNew;
        this.province = "Tất cả"
        this.provinces.push(provinceZero);
        for(let i=0;i<data.length;i++){
          this.provinces.push(data[i])
        }
      })
      }
    }
  }

  public getCities(){
    this.cityService.getCitys().subscribe(getcity => {
      //this.cities = getcity
      var cityZero = new City();
      var number = 0;
      cityZero.id = number.toString();
      cityZero.name = "Tất cả";

      var cityNew : City[] = [];
      this.cities = cityNew;
      this.cities.push(cityZero)
      for(let i=0;i<getcity.length;i++){
        this.cities.push(getcity[i])
      }
    })
  }


  public getNewTypes(){
    this.typeservice.getTypeExcepts().subscribe(gettypes => this.newTypes = gettypes)
  }

  public getPrices(){
    this.priceSearchServer.getprices().subscribe(getprice =>{
      //this.priceSearchs = getprice
      var priceZero = new PriceSearch();
      var number = 0;
      priceZero.id = 0;
      priceZero.number = "Tất cả";
      this.priceSearchs.push(priceZero);
     
      for(let i =0;i<getprice.length;i++){
        this.priceSearchs.push(getprice[i])
      }
    })
    
  }

  public onClick() {
    localStorage.removeItem('searchtext');
    if(this.searchtext === undefined){
      localStorage.setItem('searchtext', "NULL");
    }
    else{
      localStorage.setItem('searchtext', this.searchtext);
    }

    this.activerouter.data.subscribe(data => {
      this.name = data.kind;
    })

    this.newTypeSearch.emit(this.newType);
    if(this.newType === "Phòng trọ, nhà trọ" && this.name != "cho-thue-nha-tro"){
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
    else if(this.newType === "Nhà thuê nguyên căn" && this.name != "nha-cho-thue"){
      //window.location.reload();
      this.router.navigateByUrl('/home/nha-cho-thue');
    }
    else if(this.newType === "Cho thuê căn hộ" && this.name != "cho-thue-can-ho"){
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-can-ho');
    }
    else if(this.newType === "Tìm người ở ghép" && this.name != "tim-nguoi-o-ghep-cap"){
      //window.location.reload();
      this.router.navigateByUrl('/home/tim-nguoi-o-ghep-cap');
    }
    else if(this.newType === "Cho thuê mặt bằng" && this.name != "cho-thue-mat-bang"){
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-mat-bang');
    }
    //////
    else if(this.name == "cho-thue-nha-tro"){
      window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
    else if(this.name == "nha-cho-thue"){
      window.location.reload();
      this.router.navigateByUrl('/home/nha-cho-thue');
    }
    else if(this.name == "cho-thue-can-ho"){
      window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-can-ho');
    }
    else if(this.name == "tim-nguoi-o-ghep-cap"){
      window.location.reload();
      this.router.navigateByUrl('/home/tim-nguoi-o-ghep-cap');
    }
    else if(this.name == "cho-thue-mat-bang"){
      window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-mat-bang');
    }
    //////
    else {
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
  }

}
