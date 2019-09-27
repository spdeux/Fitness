import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        AngularFireAuthModule,
        TrainingRoutingModule
    ],
    exports: [],
    providers: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {
}