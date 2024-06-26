import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { MyImage } from '../myimage.model';
import { ImagesService } from '../images.service';
import { SingleImageComponent } from '../single-image/single-image.component';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [FormsModule, SingleImageComponent],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  @Output() close = new EventEmitter<void>();
  private imagesService = inject(ImagesService);
  private destroyRef = inject(DestroyRef);
  image = signal<MyImage | undefined>(undefined);
  isUploading = signal(false);
  isFailure = signal(false);
  isSuccess = signal(false);
  error = signal('');
  
  // enteredFile?:  ArrayBuffer;
  enteredLabel = '';
  enteredUrl = '';
  objectDetectionEnabled = true;

  onClose(){
    this.close.emit();
  }

  // onFileSelected(event: any){
  //   const file: File = event.target.files[0];

  //   let reader = new FileReader();

  //   reader.onloadend = () => {
  //     if (reader.result){
  //       this.enteredFile = reader.result as ArrayBuffer;
  //     }
  //   }

  //   reader.readAsArrayBuffer(file);

  // }

  onSubmit(){
    this.isUploading.set(true);

    const subscription = this.imagesService.uploadImage({
      imageUrl: this.enteredUrl,
      imageLabel: this.enteredLabel,
      enableObjectDetection: this.objectDetectionEnabled
    })
    .subscribe({
      next: (response) => {
        if (response.ok && response.body) {
          this.image.set(response.body?.image);
          this.isSuccess.set(true);
        }
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.isFailure.set(true);
      },
      complete: () => {
        this.isUploading.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    
  }

}
