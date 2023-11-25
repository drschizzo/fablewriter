import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StoryComponent } from "./story/story.component";
import { StorygenService } from './storygen.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, StoryComponent]
})
export class AppComponent implements OnInit {
  title = 'front';
  story: Observable<any>=new Observable();

  constructor(private storygen:StorygenService) {

   }
  ngOnInit(): void {
    this.story= this.storygen.getStory("The quick brown fox jumped over the lazy dog.",true);
  }
}
