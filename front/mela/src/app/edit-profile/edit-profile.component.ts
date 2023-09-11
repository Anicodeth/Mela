import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  selectedFile: File | null = null;
  imageUrl: any;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Display the selected image when it's selected.
    this.displaySelectedImage();
  }
  displaySelectedImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event) => {
        this.imageUrl = event.target?.result;
      };
    }
  }

}
