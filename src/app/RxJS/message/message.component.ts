import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  finalize,
  from,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit {
  constructor(private apiservice: ApiService, private cdr: ChangeDetectorRef) {}

  // An array to store the output messages
  outputs: { time: string; message: string }[] = [];

  // Triggers when the componet is initialized
  ngOnInit() {
    this.createObservable();
  }

  // createObservable() {
  //   this.outputs = [];
  //   this.apiservice
  //     .get('/json-response')
  //     .pipe(
  //       catchError((error) => {
  //         // Handles any errors that occer
  //         // console.log(error.error.message);
  //         return of(error.error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (data) => {
  //         // Handle each value as it is emitted
  //         console.log(data);
  //         this.outputs.push(data);
  //       },
  //       error: (error) => {
  //         // Handles any errors that occur
  //         console.error(error);
  //       },
  //       complete: () => {
  //         // Handles the completion of the Observable sequence
  //         console.log('Complete');
  //       },
  //     });
  // }

  // createObservable() {
  //   this.outputs = [];
  //   this.apiservice.createEventSourceObservable('/events').subscribe({
  //     next: (e: MessageEvent) => {
  //       // Handle each value as it is emitted
  //       console.log(e);
  //       this.outputs.push(JSON.parse(e.data));
  //       this.cdr.detectChanges();
  //     },
  //     error: (error) => {
  //       // Handles any errors that occur
  //       console.error(error);
  //     },
  //     complete: () => {
  //       // Handles the completion of the Observable sequence
  //       console.log('Complete');
  //     },
  //   });
  // }

  createObservable() {
    this.outputs = [];
    this.apiservice.createWebSocketObservable().subscribe({
      next: (e: MessageEvent) => {
        // Handle each value as it is emitted
        console.log(e);
        this.outputs.push(JSON.parse(e.data));
        this.cdr.detectChanges();
      },
      error: (error) => {
        // Handles any errors that occur
        console.error(error);
      },
      complete: () => {
        // Handles the completion of the Observable sequence
        console.log('Complete');
      },
    });
  }

  // createObservable() {
  //   const observable = new Observable((subscriber) => {
  //     subscriber.next(1);
  //     subscriber.next(2);
  //     // Emit an error
  //     subscriber.error('Someting went wrong');
  //     subscriber.next(3);
  //     subscriber.complete();
  //   });

  //   // Explicit observer object
  //   const observer = {
  //     next: (value: any) => {
  //       console.log(value);
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //     },
  //     complete: () => {
  //       console.log('Complete');
  //     },
  //   };

  //   // Subscribe to the Observable
  //   observable.subscribe(observer);
  // }

  // createObservable() {
  //   const observable = new Observable((subscriber) => {
  //     let count = 0;
  //     const interval = setInterval(() => {
  //       subscriber.next(count++);
  //     }, 1000);

  //     // setTimeout(() => {
  //     //   subscriber.error('Something went wrong');
  //     // }, 5000);

  //     // Cleanup function
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   });

  //   const subscription = observable
  //     .pipe
  //     // finalize(() => {
  //     //   this.triggerMe();
  //     // })
  //     // filter((value: any) => value % 2 === 0)
  //     // take(3)
  //     // map((value: any) => {
  //     //   return value * 2;
  //     // })

  //     // catchError((error) => of(error))
  //     ()
  //     .subscribe({
  //       next: (value) => {
  //         console.log(value);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       },
  //       complete: () => {
  //         console.log('Complete');
  //       },
  //     });

  //   // setTimeout(() => {
  //   //   subscription.unsubscribe();
  //   // }, 5000);
  // }

  // triggerMe() {
  //   console.log('Trigger');
  // }

  // createObservable() {
  //   // of(1, 2, 3).subscribe((value) => {
  //   //   console.log(value);
  //   // });
  //   from([1, 2, 3]).subscribe((value) => {
  //     console.log(value);
  //   });
  // }

  // fetchUserData(userId: string) {
  //   return timer(1000 * Math.random()).pipe(
  //     map(() => {
  //       return { userId };
  //     })
  //   );
  // }

  // createObservable() {
  //   of('1', '2', '3', '4', '5')
  //     .pipe(mergeMap((userId: string) => this.fetchUserData(userId)))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  // createObservable() {
  //   of('1', '2', '3', '4', '5')
  //     .pipe(concatMap((userId: string) => this.fetchUserData(userId)))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  // createObservable() {
  //   of('1', '2', '3', '4', '5')
  //     .pipe(switchMap((userId: string) => this.fetchUserData(userId)))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  // createObservable() {
  //   of('1', '2', '3', '4', '5')
  //     .pipe(exhaustMap((userId: string) => this.fetchUserData(userId)))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  // createObservable() {
  //   interval(1000)
  //     .pipe(take(5))
  //     .pipe(
  //       exhaustMap((value) => {
  //         return interval(1).pipe(
  //           take(1),
  //           map(() => value)
  //         );
  //       })
  //     )
  //     .subscribe(console.log);
  // }

  // createObservable() {
  //   of('1', '2', '3', '4', '5')
  //     .pipe(tap((value) => console.log('Before map: ', value)))
  //     .pipe(map((value: any) => value * 2))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
}
