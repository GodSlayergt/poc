import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements  OnChanges, AfterViewInit,OnDestroy {
  @Input() appdata = {}
  @Input() manifestPath = ''
  @Input() namespace:any
  @Input() id ='test'
  @Input() domain:string =''

  public data: any;

 
  ngOnChanges(): void {
    console.log("change")
    this.mount(this.namespace);
  }
  ngAfterViewInit(): void {
    console.log("view")
    this.load(this.manifestPath).then((res)=>{
      this.data = {...res}
      this.mount(this.namespace);
    })
    
  }

  ngOnDestroy():void{
    //unmount the react app
  }

  async load(manifestPath: string): Promise<any> {
    if(this.data){
      return this.data
    }
    const response = await fetch(manifestPath);
    if (!response.ok) {
      return 'Fail';
    }
    const data = await response.json();
    return data;
  }

  mount(namespace: any) {
    if(!this.data){
      return 
    }
    for (var key of Object.keys(this.data)) {
     
      if (key==="main.js") {
        this.data[key] = this.domain+this.data[key]
        const script = document.createElement('script');
        script.src = this.data[key];
        script.id = 'react-app';
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
          if (window && namespace in window) {
            (window[namespace] as any).default.render(
              {
                selector:'#'+this.id,
                props:this.appdata
              }
            );
          }
        };
      }
    }
  }
}
