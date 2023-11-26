import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StoryComponent } from "./story/story.component";
import { StorygenService } from './storygen.service';
import { Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, StoryComponent,ReactiveFormsModule]
})
export class AppComponent implements OnInit {
  title = 'front';
  story: Observable<any>=new Observable();
  prompt=new FormControl('');
  isDemo=new FormControl(true);
  constructor(private storygen:StorygenService) {



   }

genStory() {
  console.log("prompt : ",this.isDemo.value)
  this.story=this.storygen.getStory(this.prompt.value+'',this.isDemo.value || false);
}


  ngOnInit(): void {
    //this.story= this.storygen.getStory("The quick brown fox jumped over the lazy dog.",true);
  }
}
