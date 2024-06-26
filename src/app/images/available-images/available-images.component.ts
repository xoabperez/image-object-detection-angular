import { Component, DestroyRef, Input, OnInit, SimpleChanges, inject, signal } from '@angular/core';

import { ImagesComponent } from '../images.component';
import { ImagesContainerComponent } from '../images-container/images-container.component';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-available-images',
  standalone: true,
  templateUrl: './available-images.component.html',
  styleUrl: './available-images.component.css',
  imports: [ImagesComponent, ImagesContainerComponent],
})
export class AvailableImagesComponent implements OnInit {
  @Input() objects = '';
  private imagesService = inject(ImagesService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');
  images = this.imagesService.loadedImages;
  title = 'All Images';

  ngOnInit() {
    this.isFetching.set(true);

    const subscription = this.imagesService.loadImages()
    .subscribe({
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  };

  ngOnChanges(changes: SimpleChanges){
    this.isFetching.set(true);

    if (changes['objects'].currentValue == ''){
      this.title = 'All Images';
    } else {
      this.title = 'Images matching "' + changes['objects'].currentValue + '"'
    }
    
    const subscription = this.imagesService.loadMatchingImages(changes['objects'].currentValue)
    .subscribe({
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

