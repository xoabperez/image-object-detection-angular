import { Injectable, inject, signal } from '@angular/core';

import { MyImage } from './myimage.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Upload } from './upload.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private httpClient = inject(HttpClient);
  private images = signal<MyImage[]>([]);

  loadedImages = this.images.asReadonly();

  loadImages() {
    return this.fetchImages("http://localhost:8080/images", "Sorry, something went wrong fetching images.");
  }

  loadMatchingImages(objects: string) {
    const url = "http://localhost:8080/images" + ((objects) ? "?objects=" + objects! : "")

    return this.fetchImages(url, "Sorry, something went wrong fetching images.")
  }

  uploadImage(upload: Upload) {
    return this.httpClient.post<{ image: MyImage }>("http://localhost:8080/images", {
      // imageData: upload.imageData,
      imageUrl: upload.imageUrl,
      imageLabel: upload.imageLabel,
      enableObjectDetection: upload.enableObjectDetection
    }, {
      observe: 'response'
    }).pipe(catchError((error) => {
      console.log(error);
      return throwError(() => new Error('Sorry, this image could not be uploaded.'));
    }))
  }

  private fetchImages(url: string, errorMessage: string){
    return this.httpClient
    .get<{ images: MyImage[] }>(url, {
      observe: 'response'
    })
    .pipe(catchError((error) => {
      console.log(error);
      return throwError(() => new Error(errorMessage));
    }))
    .pipe(
      tap({
        next: (response) => this.images.set(response.body?.images!),
      })
    );
  }
}
