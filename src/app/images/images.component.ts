import { Component, input, output } from '@angular/core';
import { SingleImageComponent } from './single-image/single-image.component';
import { MyImage } from './myimage.model';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [SingleImageComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
})
export class ImagesComponent {
  images = input.required<MyImage[]>();
  selectImage = output<MyImage>();

  onSelectImage(image: MyImage) {
    this.selectImage.emit(image);
  }
}
