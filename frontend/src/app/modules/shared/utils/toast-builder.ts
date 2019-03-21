import {Toast} from 'angular2-toaster';

export class ToastBuilder {

  constructor() {}

  static successRegisterUser(): Toast {
    return {
      type: 'success',
      title: 'User registered successfully',
      body: ''
    };
  }

  static errorWhileUpdatingItem(): Toast {
    return {
      type: 'error',
      title: 'Error while updating item',
      body: ''
    };
  }

  static errorWhileInsertingItem(): Toast {
    return {
      type: 'error',
      title: 'Error while inserting item',
      body: ''
    };
  }

  static errorWhileDeletingItem(): Toast {
    return {
      type: 'error',
      title: 'Error while deleting item',
      body: ''
    };
  }

  static errorWhileRegisterUser(): Toast {
    return {
      type: 'error',
      title: 'Error while register user',
      body: ''
    };
  }

  static errorEmptyName(): Toast {
    return {
      type: 'error',
      title: 'Name can not be empty',
      body: ''
    };
  }

  static errorIncorrectName(): Toast {
    return {
      type: 'error',
      title: 'Name must have at least 1 character and max 255 characters.',
      body: ''
    };
  }

  static errorEmptyModule(): Toast {
    return {
      type: 'error',
      title: 'Module can not be empty',
      body: ''
    };
  }

  static errorEmptyCategory(): Toast {
    return {
      type: 'error',
      title: 'Category can not be empty',
      body: ''
    };
  }

  static errorWrongValue(): Toast {
    return {
      type: 'error',
      title: 'Value must be greater than 0',
      body: ''
    };
  }

  static errorEmptyDate(): Toast {
    return {
      type: 'error',
      title: 'Date can not be empty',
      body: ''
    };
  }

  static successUpdateItem(): Toast {
    return {
      type: 'success',
      title: 'Item updated successfully',
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

  static warningTemplateForRecordAlreadyAdded(): Toast {
    return {
      type: 'warning',
      title: 'Template for the record already added',
      body: ''
    };
  }
}
