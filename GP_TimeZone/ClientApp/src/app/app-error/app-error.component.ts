import { Component, Input } from '@angular/core';

import { IUError } from 'src/app/domain/app.domain';

@Component({
  selector: 'app-error',
  templateUrl: './app-error.component.html'
})

export class AppErrorComponent {

  @Input() errorMessage : string | undefined;

  @Input() iUError: IUError | undefined;

  constructor() {    
  }

}
