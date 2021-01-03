import { Component, Inject, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { MotelService } from '../../../../services/motel.service';
import { BillService } from '../../../../services/bill.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { Bill } from 'src/app/model/Bill';
import { Motel } from 'src/app/model/Motel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface Type{
  id:number;
  text:string;
}

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  payPalConfig?: IPayPalConfig;
  showSuccess: boolean;


  //Xét tính tiền
  bill = new Bill;
  price:number;

  time;
  public times:Array<Type> = [
    {id: 0, text:'Đăng theo ngày'},
    {id: 1, text:'Đăng theo tuần'},
    {id: 2, text:'Đăng theo tháng'},
  ];

  number;

  constructor(private router: Router,public dialogRef: MatDialogRef<PaypalComponent>,@Inject(MAT_DIALOG_DATA) public data: Motel,public dangtinService:MotelService,private billService:BillService,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {
    console.log(this.data)
    this.time = this.data.time;
    this.tinhTien();
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    // Gía tiền
    console.log(this.bill);
    var usd = "0.000043";
    this.bill.payMoney = this.bill.payMoney * Number(usd);
    var one = -1;
    this.bill.payMoney = Number((this.bill.payMoney).toFixed(1));
    this.number = this.bill.payMoney;
    console.log(this.number);

    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.bill.payMoney.toString() ,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.number // Gía tiền
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.number ,// Gía tiền
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);

        console.log("Bạn phải thanh toán là:",this.number);// Gía tiền
        this.billService.addBill(this.bill).subscribe(a => {
          console.log(a)
        })
        this.onDuyetTin(this.data);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  public onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/user/quan-ly-dang-tin']);
  }

  public onDuyetTin(motel: Motel){
    if(motel.verifyUser == true ){
      alert("Nhà trọ này đang được đăng");
    }
    else{
      var motelupdate = new Motel();
      motelupdate = motel;
      motelupdate.verifyUser = true;
      motelupdate.status = "Tin đang hiển thị";
      console.log(motelupdate);
      this.dangtinService.updateMotel(motelupdate).subscribe(update => {
        console.log(update);
      })
      this.onNoClick();
    }

  }


  public tinhTien(){
    var time = this.time.split(" ");
    this.bill.numberDatePublish = Number(time[0]);
    this.bill.motelId = this.data.id;
    if(this.data.typeservice == "Tin Hot"){
      if(time[1].toString() == "Ngày"){
        this.price = 50000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 315000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 120000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin VIP 3"){
      if(time[1].toString() == "Ngày"){
        this.price = 30000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 190000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 800000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin VIP 2"){
      if(time[1].toString() == "Ngày"){
        this.price = 20000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 133000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 540000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin VIP 1"){
      if(time[1].toString() == "Ngày"){
        this.price = 10000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 63000

        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 240000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin thường"){
      if(time[1].toString() == "Ngày"){
        this.price = 2000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 12000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 48000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
  }

}

