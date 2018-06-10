import { NgModule } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [LoginFormComponent]
})
export class LoginModule { }
