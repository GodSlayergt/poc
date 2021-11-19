import { Component, OnChanges } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  heading = 'Angular';
  public initaldata = {count:1}
 
  Inc():void{
    this.initaldata.count +=1
    this.initaldata  =  Object.assign({}, this.initaldata);
  }
}
