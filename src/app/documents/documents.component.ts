import { error } from '@angular/compiler/src/util';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-documents',
  template: `
    <div class="example-config">
      <button kendo-button (click)="pdf.saveAs('invoice.pdf')">
        Save As PDF...
      </button>
    </div>

    <kendo-pdf-export #pdf paperSize="A4" margin="2cm">
      <my-invoice [data]="data"></my-invoice>
    </kendo-pdf-export>
  `,
  styles: [`
    kendo-pdf-export {
      font-family: "DejaVu Sans", "Arial", sans-serif;
      font-size: 12px;
    }
  `],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [ApiService, ToolbarService]
})
export class DocumentsComponent implements OnInit {

  contents  = [{title: 'essenviatest'}];
  selectedContent;
  id;
  title;
  description;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private titleService : Title,
    private meta: Meta
  ) { 
    titleService.setTitle('Essanvia Test');
    meta.updateTag({
      name:'viewport', content:'width=device-width, initial-scale=1'
      });      
    
    this.getContents();
    this.selectedContent = {id: -1, title:'', description:''}
   }

  ngOnInit() {
  }

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
      
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
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
