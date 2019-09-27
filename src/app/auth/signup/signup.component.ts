import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  isLoading: boolean = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoaded => {
      this.isLoading = isLoaded;
    })
  }

  onSubmit(form: NgForm) {
    this.authService.register({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

}
