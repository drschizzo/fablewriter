import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { StorygenService } from '../storygen.service';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent implements OnChanges{


 

  @Input() prompt: string='';

  imgUrl:string='';

  constructor(private storygen:StorygenService) { 
  }

  genImage() {
    
    this.storygen.getImage(this.prompt,true).subscribe((res:any) => {
      this.imgUrl=res;
    })
  }

  ngOnChanges(changes:any): void {
    
    console.log(changes);
    // if (changes.prompt) {
      
    //   console.log(this.prompt);
    // }
  }

}
