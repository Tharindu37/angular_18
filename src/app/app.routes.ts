import { Routes } from '@angular/router';
import { MessageComponent } from './RxJS/message/message.component';
import { PrintReportComponent } from './print/print-report/print-report.component';

export const routes: Routes = [
  { path: '', component: MessageComponent },
  { path: 'report', component: PrintReportComponent },
];
