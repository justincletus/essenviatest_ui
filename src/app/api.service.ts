
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseurl = "http://127.0.0.1:8001";
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  })

  constructor(private http: HttpClient) { }

  getAllContent(): Observable<any>{
    return this.http.get(this.baseurl +'/content/', 
    {headers: this.httpHeaders});
  }

  createContent(content): Observable<any> {
    const body = {title:content.title, description:content.description};

    return this.http.post(this.baseurl +'/content/', body, {
      headers: this.httpHeaders
    });
  }

  getOneContent(id): Observable<any> {
    return this.http.get(this.baseurl +'/content/' +id +'/',
    {headers: this.httpHeaders});
  }

  updateContent(content): Observable<any> {
    const body = {title: content.title, description: content.description}

    return this.http.put(this.baseurl +'/content/' +content.id +'/', body,
    {headers: this.httpHeaders});
  }

  deleteContent(id): Observable<any> {
    return this.http.delete(this.baseurl +'/content/' +id +'/', 
    {headers: this.httpHeaders});
  }


}
