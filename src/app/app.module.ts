import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';



import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent,
   

  ],
  imports: [
    CommonModule,
    BrowserModule,

    NgxChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
