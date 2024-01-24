import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtmlPipe',
  standalone: true
})
export class SafeHtmlPipePipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value: any, ...args: unknown[]): unknown {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
