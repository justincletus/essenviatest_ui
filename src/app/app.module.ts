import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsComponent } from './documents/documents.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';


// import { angularTrix } from 'angular-trix';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
    DocumentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularFontAwesomeModule,
    PDFExportModule
    

    // angularTrix

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
