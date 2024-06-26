import { Component, SimpleChanges, input } from '@angular/core';
import { MyImage } from '../myimage.model';

@Component({
  selector: 'app-single-image',
  standalone: true,
  imports: [],
  templateUrl: './single-image.component.html',
  styleUrl: './single-image.component.css'
})
export class SingleImageComponent {
  image = input.required<MyImage>();

  getUrl(url: string) {
    return btoa(url);
  }

  formatLabel(label: string){
    if (label.startsWith("no-label-")){
      return ""
    } else if (label.length < 15){
      return label
    } else {
      return label.slice(0, 15) + "...";
    }
  }

  formatObjects(objects: string){
    return objects.replace("{", "").replace("}", "").slice(0, 15) + "...";
  }
}
