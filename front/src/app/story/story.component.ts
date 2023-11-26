import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from "../image/image.component";

@Component({
    selector: 'app-story',
    standalone: true,
    templateUrl: './story.component.html',
    styleUrl: './story.component.scss',
    imports: [CommonModule, ImageComponent]
})
export class StoryComponent implements OnInit, OnChanges {

  @Input() story: any;

  constructor() { 

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.story);
  }
  ngOnInit(): void {
    
  }

}
