import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueServiceService {

  constructor() { }

  //temporary
  joinQueue() : Observable<void> {
    return new Observable<void>(observer => {
      interval(3000).subscribe(() => {
        observer.next();
        observer.complete();
      })
    })
  }
}
