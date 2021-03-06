import { element } from 'protractor';
// import { HtmlEditorService } from '';
import { from } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { error } from '@angular/compiler/src/util';
import * as Editor from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, ToolbarService]
  
})
export class AppComponent {

  contents  = [{title: 'essenviatest'}];
  selectedContent;
  id;
  title;
  description;

  public Editor = ClassicEditor;

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  public model = {
    editorData: '<p>Hello, world!</p>'
  };

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
  }
  // public StandardEditor = Editor
  // public Editor = DecoupledEditor;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private titleService: Title,
    private meta: Meta
  ) {
    titleService.setTitle('Essanvia Test');
    meta.updateTag({
      name:'viewport', content:'width=device-width, initial-scale=1'
      });      
    
    this.getContents();
    this.selectedContent = {id: -1, title:'', description:''}
  
  }
  
  getContents = () => {
    this.api.getAllContent().subscribe(
      data => {
        this.contents = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  contentClicked = (content) => {
    this.api.getOneContent(content.id).subscribe(
      data => {
        this.selectedContent = data;
      },
      error => {
        console.log(error);
      }
    )
  }


  updateContent = () => {
    this.api.updateContent(this.selectedContent).subscribe(
      data => {
        this.getContents();
      },
      // console.log(data);
      error => {
        console.log(error);
      }
    )
  }

  createContent = () => {
    this.api.createContent(this.selectedContent).subscribe(
      data => {
        this.contents.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteContent = (content) => {
    this.api.deleteContent(this.selectedContent.id).subscribe(
      data => {
        this.getContents();
      },
      error => {
        console.log(error);
      }
    )

    

  }

  onGoToPage2 = () => {
    data => {
      console.log('this is second page');
    }
    error => {
      console.log(error);
    }
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );  
  } 

  // title = 'essenviatest';
  
  @ViewChild('pdfContent', {static: true}) pdfContent: ElementRef;
  public downloadPDF() {    
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };
    let pdfcontent = this.pdfContent.nativeElement;
    doc.fromHTML(pdfcontent.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('document' + '.pdf');

  }    

}
