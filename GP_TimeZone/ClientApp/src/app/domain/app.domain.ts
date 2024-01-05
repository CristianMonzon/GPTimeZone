import { HttpErrorResponse } from '@angular/common/http';

export class IUError {

  public errorMessage: string = "";

  public hasError(): boolean {
    return (this.errorMessage != "");
  }

  constructor(error: HttpErrorResponse) {
    this.errorMessage = error.message;
  }

}

