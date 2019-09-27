import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  // @Output() trainingExit = new EventEmitter<void>();
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumTimer();
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,
      {
        width: '250px',
        data: { progress: this.progress }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //back to previous page
        // this.trainingExit.emit();
        this.trainingService.cancelExercise(this.progress);
      }
      else {
        //resume the timer
        this.startOrResumTimer();
      }

    });

  }

  startOrResumTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 20;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }

    }, step);
  }

}
