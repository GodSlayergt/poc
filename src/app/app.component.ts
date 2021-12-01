import { Component} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title="POC"
  heading = 'Angular';
  public initaldata = {heading:"React App",count:0}
 
  
  reset():void{
    this.initaldata.count =0
    this.initaldata  =  Object.assign({}, this.initaldata);
  }
}
