import {Toast} from "angular2-toaster";

export class ToastBuilder {

  constructor() {}

  static successRegisterUser(): Toast {
    return {
      type: 'success',
      title: 'User registered successfully',
      body: ''
    };
  }

  static errorWhileRegisterUser() : Toast {
    return {
      type: 'error',
      title: 'Error while register user',
      body: ''
    };
  }
}
