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
  @ViewChild('container') reactapp: ElementRef;
  @Input() appdata  :Object
  @Input() manifestPath = ''
  @Input() namespace:any
  @Input() id ='test'

  public Loading = true;
  public data: any;

 
  ngOnChanges(): void {
    this.mount(this.namespace);
  }
  ngAfterViewInit(): void {
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
      let temp = key.match(/\.[0-9a-z]+$/i);
      if (temp && temp[0] == '.js') {
        const script = document.createElement('script');
        script.src = this.data[key];
        script.id = 'react-app';
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
          if (window && namespace in window) {
            (window[namespace] as any).default.render(
              this.reactapp.nativeElement,
              this.appdata
            );
          }
        };
      }
    }
  }
}
