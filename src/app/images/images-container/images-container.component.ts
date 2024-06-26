import { Component, input } from '@angular/core';

@Component({
  selector: 'app-images-container',
  standalone: true,
  imports: [],
  templateUrl: './images-container.component.html',
  styleUrl: './images-container.component.css'
})
export class ImagesContainerComponent {
  title = input.required<string>();
}
