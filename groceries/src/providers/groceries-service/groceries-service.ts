
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {map, catchError } from 'rxjs/operators';
/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080"

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(){
    return this.http.get(this.baseURL + 'api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
    /**return this.items;**/
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response){
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.mesage : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeItem(id){
    console.log("#### Remove Item - id = ", id);
    this.http.delete(this.baseURL + "/api/groceries/" + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
    /**this.items.splice(index, 1);**/
  }
  addItem(item){
    this.http.post(this.baseURL + "/api/groceries", item).subscribe( res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }
  /**addItem(item){
    this.items.push(item);
  }**/

  editItem(item,index){
    console.log("Editing item = ", item);
    this.http.put(this.baseURL + "/api/groceries" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
  /**editItem(item,index){
    this.items[index] = item;
  }**/
}
