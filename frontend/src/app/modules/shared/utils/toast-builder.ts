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

  static errorEmptyName() : Toast {
    return {
      type: 'error',
      title: 'Name can not be empty',
      body: ''
    };
  }

  static errorEmptyModule() : Toast {
    return {
      type: 'error',
      title: 'Module can not be empty',
      body: ''
    };
  }

  static successUpdateCategory(): Toast {
    return {
      type: 'success',
      title: 'Category updated successfully',
      body: ''
    };
  }

  static successInsertItem(): Toast {
    return {
      type: 'success',
      title: 'Item inserted successfully',
      body: ''
    };
  }

  static successDeleteItem(): Toast {
    return {
      type: 'success',
      title: 'Item deleted successfully',
      body: ''
    };
  }

  static warningTemplateForRecordAlreadyAdded() : Toast {
    return {
      type: 'warning',
      title: 'Template for the record already added',
      body: ''
    };
  }
}
