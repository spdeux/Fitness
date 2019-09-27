import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Subject,Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChangeed = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = []
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];


  constructor(private db: AngularFirestore) { }


  fetchAvailableExercises() {

    this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: (doc.payload.doc.data() as Exercise).name,
            duration: (doc.payload.doc.data() as Exercise).duration,
            calories: (doc.payload.doc.data() as Exercise).calories
          }
        })
      })).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChangeed.next([...this.availableExercises]);
      }, error => {
        // console.log(error);
      });
  }

  startExercise(selectedId: string) {
    
    this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    
    this.addDataToDataBase
      ({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    
    this.addDataToDataBase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    return this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }, error => {
      // console.log(error);
    });
  }
 
  private addDataToDataBase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}