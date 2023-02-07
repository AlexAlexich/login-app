import { Directive } from '@angular/core';
import { Subject } from 'rxjs';
@Directive({})
export class CommonComponent {
  localNgUnsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.localNgUnsubscribe.next();
    this.localNgUnsubscribe.complete();
  }
}
