import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  endpoint = 'http://localhost:3000';
  wsEndpoint = 'ws://localhost:8080';

  // Simple GET request
  get(url: string): Observable<any> {
    return this.httpClient.get(this.endpoint + url);
  }

  // EventSource Observable
  createEventSourceObservable(url: string): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventSource = new EventSource(this.endpoint + url);

      eventSource.onmessage = (event) => {
        observer.next(event);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      // Cleanup function
      return () => {
        eventSource.close();
      };
    });
  }

  // Connect to WebSocket
  createWebSocketObservable(): Observable<MessageEvent> {
    const webSocket = new WebSocket(this.wsEndpoint);

    return new Observable((observer) => {
      webSocket.onmessage = (event) => {
        observer.next(event);
      };

      webSocket.onerror = (error) => {
        observer.error(error);
        webSocket.close();
      };

      // Cleanup function
      return () => {
        webSocket.close();
      };
    });
  }
}
