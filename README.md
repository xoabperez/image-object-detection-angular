# Image Object Detection Frontend

This is my first project written in angular; it's a bit messy. Regardless, some functionality is available - it is currently capable of working with the [back-end]([url](https://github.com/xoabperez/image-object-detection)) to add images, display images, and filter images by objects.

## Requirements
[Node.js v20.15.0](https://nodejs.org/en) and [Angular CLI v18.0.0](https://angular.dev/tools/cli/setup-local) were used for this project. 

## Setup
The back-end should be running on `localhost:8080`, otherwise the following files will need to be updated (sorry): `src/app/images/single-image/single-image.component.html` and `src/app/images/images.service.ts`. 

Run the following commands to install dependencies and start the local development server: 

```
npm install
npm start
```
