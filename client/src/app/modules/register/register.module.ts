import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [RegisterFormComponent]
})
export class RegisterModule { }
