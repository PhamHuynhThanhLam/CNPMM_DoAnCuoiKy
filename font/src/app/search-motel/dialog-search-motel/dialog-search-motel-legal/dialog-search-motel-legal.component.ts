import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-search-motel-legal',
  templateUrl: './dialog-search-motel-legal.component.html',
  styleUrls: ['./dialog-search-motel-legal.component.css']
})
export class DialogSearchMotelLegalComponent implements OnInit {

  @Input() legalTypeSearch:string;
  @Input() legalData;

  @Output() legalnotify: EventEmitter<string> = new EventEmitter<string>();

  @Output() legaltick: EventEmitter<string> = new EventEmitter<string>();
  tickChoice;
  choice = "Tất cả"
  choiceLegal;
  constructor() { 
  }

  ngOnInit(): void {
    if(localStorage.getItem('legalName')){
      this.choiceLegal = localStorage.getItem('legalName');
    }
  }

  public onClick() {
    this.legalnotify.emit('legal');
  }

  public onClickChoice(data: any) {
    if(data == "Tất cả"){
      this.legaltick.emit(data);
    }
    else{
      this.legaltick.emit(data);
      localStorage.setItem('legalName', data);
    }

    this.legalnotify.emit('legal');


  }

}
