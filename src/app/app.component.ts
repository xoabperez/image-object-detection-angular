import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvailableImagesComponent } from './images/available-images/available-images.component';
import { UploadImageComponent } from './images/upload-image/upload-image.component';
import { SingleImageComponent } from './images/single-image/single-image.component';
import { MyImage } from './images/myimage.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AvailableImagesComponent, UploadImageComponent, SingleImageComponent, FormsModule],
})
export class AppComponent {
  enteredSearch = '';
  objects = signal('');
  isUploadingImage = false;

  onSubmit(){
    this.objects.set(this.enteredSearch);
  }

  onStartUpload(){
    this.isUploadingImage = true;
  }

  onEndUpload(){
    this.isUploadingImage = false;
  }

}
