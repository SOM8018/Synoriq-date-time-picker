import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AppComponent } from './app.component';
import { ToasterServiceService } from './toaster-service.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AmazingTimePickerModule
  ],
  providers: [ToasterServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
