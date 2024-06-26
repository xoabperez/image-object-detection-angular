export interface MyImage {
  id: number;
  label: string;
  url: string;
  imageData: ArrayBuffer;
  objectDetectionEnabled: boolean;
  objects: string;
}
