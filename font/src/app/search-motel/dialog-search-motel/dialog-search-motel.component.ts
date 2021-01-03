import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaSearch } from 'src/app/model/AreaSearch';
import { User } from 'src/app/model/User';
import { AreaSearchService } from '../../services/area-search.service'

export interface Type{
  id:number;
  name:string;
}

@Component({
  selector: 'app-dialog-search-motel',
  templateUrl: './dialog-search-motel.component.html',
  styleUrls: ['./dialog-search-motel.component.css']
})
export class DialogSearchMotelComponent implements OnInit {

  wasArea: any;
  wasLegal: any;
  wasDirect: any;

  openDetailSearch;

  areaSearch;
  legalSearch;
  directSearch;

  area: AreaSearch[];
  directs:Array<Type> = [
    {id: 0, name:'Đông'},
    {id: 1, name:'Tây'},
    {id: 2, name:'Nam'},
    {id: 3, name:'Bắc'},
    {id: 4, name:'Đông Bắc'},
    {id: 5, name:'Đông Nam'},
    {id: 6, name:'Tây Bắc'},
    {id: 7, name:'Tây Nam'},
  ];

  legals:Array<Type> = [
    {id: 0, name:'Sổ đỏ'},
    {id: 1, name:'Sổ hồng'},
    {id: 2, name:'Sổ trắng'},
    {id: 3, name:'Giấy chứng nhận quyền sở hữu'},
    {id: 4, name:'Giấy tờ hợp lệ'},
    {id: 5, name:'Giấy phép xây dựng'},
    {id: 6, name:'Giấy phép kinh doanh'},
    {id: 7, name:'Giấy viết tay'},
    {id: 8, name:'Đang hơp thức hóa'},
    {id: 9, name:'Chưa xác định'},
  ];

  tickArea = "";
  tickLegal = "";
  tickDirect = "";

  choiceLegal;
  choiceDirect;
  choiceArea;
  constructor(public dialog: MatDialog,
    private areaSearchService:AreaSearchService,
    public dialogRef: MatDialogRef<DialogSearchMotelComponent>) {

    }

  ngOnInit(): void {


    if(localStorage.getItem('tickArea')){
      this.tickArea = "Tick xanh";
    }
    if(localStorage.getItem('tickLegal')){
      this.tickLegal = "Tick xanh";
    }
    if(localStorage.getItem('tickDirect')){
      this.tickDirect = "Tick xanh";
    }
  }

  public deleteData(){
    localStorage.removeItem('areaName');
    localStorage.removeItem('directName');
    localStorage.removeItem('legalName');
    localStorage.removeItem('tickArea');
    this.tickArea = "";
    localStorage.removeItem('tickLegal');
    this.tickLegal = "";
    localStorage.removeItem('tickDirect');
    this.tickDirect = "";
  }

  public onNotify(message: string): void { 
    if(message == "area"){
      this.wasArea = "";
    }
    else if(message == "direct"){
      this.wasDirect = "";   
    }
    else if(message == "legal"){
      this.wasLegal = "";
    }
 
  }


  public onTickArea(message: string): void { 
    console.log(message)
    if(message == "Tất cả"){
      this.tickArea = "";
    }
    else{
      var dataArea = this.area.find(a => a.name == message);
      if(dataArea)
      {
        this.choiceArea = dataArea.name;
        this.tickArea = "Tick xanh";
        localStorage.setItem('tickArea', "Tick xanh");
      }
    }
   

  }


  public onTickLegal(message: string): void { 
    if(message == "Tất cả"){
      this.tickLegal = "";
    }
    else{
      var dataLegal = this.legals.find(a => a.name == message);
      if(dataLegal)
      {
        this.choiceLegal = dataLegal.name;
        this.tickLegal = "Tick xanh";
        localStorage.setItem('tickLegal', "Tick xanh");
      }
    }
   

  }

  public onTickDirect(message: string): void { 
    if(message == "Tất cả"){
      this.tickDirect = "";
    }
    else{
      var dataDirect = this.directs.find(a => a.name == message);
      if(dataDirect)
      {
        this.choiceDirect = dataDirect.name;
        this.tickDirect = "Tick xanh";
        localStorage.setItem('tickDirect', "Tick xanh");
      }
    }
   

  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onChoiceArea(){
    this.wasArea = "Xac Thuc";
    this.openDetailSearch = "Diện tích";
    this.areaSearchService.getAreaSearch().subscribe(getareasaerch => {
      this.areaSearch = getareasaerch
      this.area = getareasaerch;
    });
  }

  public onChoiceDirect(){
    this.wasDirect = "Xac Thuc";
    this.openDetailSearch = "Hướng";
    this.directSearch = this.directs;
  }

  public onChoiceLegal(){
    this.wasLegal = "Xac Thuc";
    this.openDetailSearch = "Pháp lý";
    this.legalSearch = this.legals;
  }

}
