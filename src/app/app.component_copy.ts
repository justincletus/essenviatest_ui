// import { HtmlEditorService } from '';
import { from } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { error } from '@angular/compiler/src/util';
import * as Editor from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, ToolbarService]
  // providers: [ApiService]
  
})
export class AppComponent {

  contents  = [{title: 'essenviatest'}];
  selectedContent;
  id;
  title;
  description;

  public Editor = ClassicEditor;

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

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );  
  } 

  // title = 'essenviatest';
}

// export class MyComponent {
  

//   public onReady(editor) {
//     editor.ui.getEditableElement().parentElement.insertBefore(
//         editor.ui.view.toolbar.element,
//         editor.ui.getEditableElement()
//     );
//   }
//   // ...
// }
