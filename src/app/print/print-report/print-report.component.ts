import { Component, inject } from '@angular/core';
import { NgxPrintModule, NgxPrintService, PrintOptions } from 'ngx-print';

@Component({
  selector: 'app-print-report',
  standalone: true,
  imports: [NgxPrintModule],
  templateUrl: './print-report.component.html',
  styleUrl: './print-report.component.scss',
})
export class PrintReportComponent {
  private printService = inject(NgxPrintService);

  printMe() {
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section',
      // Add any other print options as needed
    });
    this.printService.print(customPrintOptions);
  }
}
