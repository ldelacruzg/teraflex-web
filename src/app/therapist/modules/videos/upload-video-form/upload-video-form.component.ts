import { Component } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-video-form',
  templateUrl: './upload-video-form.component.html',
  styleUrls: ['./upload-video-form.component.css']
})
export class UploadVideoFormComponent {

  ngOnInit() {
    const selectImage = document.querySelector('#container-video') as HTMLInputElement;
    const inputFile = document.querySelector('#file') as HTMLInputElement;
    const imgArea = document.querySelector('.img-area') as HTMLElement;

    selectImage.addEventListener('click', function () {
      inputFile.click();
    });

    inputFile.addEventListener('change', function () {
      if (this.files && this.files.length > 0) {
        const image = this.files[0];
        if (image.size < 6000000) {
          const reader = new FileReader();
          reader.onload = () => {
            const allImg = imgArea.querySelectorAll('img');
            allImg.forEach((item) => item.remove());
            const imgUrl = reader.result as string;
            const img = document.createElement('img');
            img.src = imgUrl;
            imgArea.appendChild(img);
            imgArea.classList.add('active');
            imgArea.dataset['img'] = image.name; // Utilizamos notación de corchetes
          };
          reader.readAsDataURL(image);
        } else {
          alert('Image size more than 6MB');
        }
      }
    });
  }

  /*Icons to use*/
  iconVideo = iconos.faVideoCamera;
  iconUploadVideo = iconos.faUpload;
}
