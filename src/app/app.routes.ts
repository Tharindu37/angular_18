import { Routes } from '@angular/router';
import { MessageComponent } from './RxJS/message/message.component';
import { PrintReportComponent } from './print/print-report/print-report.component';
import { Example1Component } from './animations/example1/example1.component';

export const routes: Routes = [
  { path: '', component: MessageComponent },
  { path: 'report', component: PrintReportComponent },
  { path: 'animations', component: Example1Component },
];
