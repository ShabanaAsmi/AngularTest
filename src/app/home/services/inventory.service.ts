import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  public data = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { 
 }
 
  public headerObj = new HttpHeaders().set('Content-Type', 'application/json')
  getAllFields(){
    const httpOptions = { headers: this.headerObj };
    return this.http.get('http://localhost:3000/posts', httpOptions);  
  }
  deleteInventory(elementId) {
    const httpOptions = { headers: this.headerObj };
    return this.http.delete('http://localhost:3000/posts/' + elementId , httpOptions);
}
createInventory(body) {
  const httpOptions = { headers: this.headerObj };
  return this.http.post('http://localhost:3000/posts/',body, httpOptions);
}

updateInventory(elementId,body) {
  const httpOptions = { headers: this.headerObj };
  return this.http.put('http://localhost:3000/posts/'+ elementId, body , httpOptions);
}
}
