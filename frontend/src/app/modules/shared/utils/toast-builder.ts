import {Toast} from 'angular2-toaster';

export class ToastBuilder {

  constructor() {}

  static successRegisterUser(): Toast {
    return {
      type: 'success',
      // title: 'User registered successfully',
      title: 'Użytkownik został stworzony.',
      body: ''
    };
  }

  static errorWhileUpdatingItem(): Toast {
    return {
      type: 'error',
      // title: 'Error while updating item',
      title: 'Błąd podczas aktualizacji rekordu.',
      body: ''
    };
  }

  static errorWhileInsertingItem(): Toast {
    return {
      type: 'error',
      // title: 'Error while inserting item',
      title: 'Błąd podczas dodawania rekordu.',
      body: ''
    };
  }

  static errorWhileDeletingItem(): Toast {
    return {
      type: 'error',
      // title: 'Error while deleting item',
      title: 'Błąd podczas usuwania rekordu.',
      body: ''
    };
  }

  static errorWhileRegisterUser(): Toast {
    return {
      type: 'error',
      // title: 'Error while register user',
      title: 'Błąd podczas tworzenia użytkownika.',
      body: ''
    };
  }

  static errorEmptyName(): Toast {
    return {
      type: 'error',
      // title: 'Name can not be empty',
      title: 'Nazwa nie może być pusta.',
      body: ''
    };
  }

  static errorIncorrectName(): Toast {
    return {
      type: 'error',
      // title: 'Name must have at least 1 character and max 255 characters.',
      title: 'Nazwa musi zawierać przynajmniej od 1 do 255 znaków.',
      body: ''
    };
  }

  static errorEmptyModule(): Toast {
    return {
      type: 'error',
      // title: 'Module can not be empty',
      title: 'Moduł nie może być pusty.',
      body: ''
    };
  }

  static errorEmptyCategory(): Toast {
    return {
      type: 'error',
      // title: 'Category can not be empty',
      title: 'Kategoria nie może być pusta.',
      body: ''
    };
  }

  static errorWrongValue(): Toast {
    return {
      type: 'error',
      // title: 'Value must be greater than 0',
      title: 'Wartość musi być większa od 0.',
      body: ''
    };
  }

  static errorEmptyDate(): Toast {
    return {
      type: 'error',
      // title: 'Date can not be empty',
      title: 'Data nie może być pusta.',
      body: ''
    };
  }

  static successUpdateItem(): Toast {
    return {
      type: 'success',
      // title: 'Item updated successfully',
      title: 'Wpis został zaktualizowany.',
      body: ''
    };
  }

  static successInsertItem(): Toast {
    return {
      type: 'success',
      // title: 'Item inserted successfully',
      title: 'Wpis został dodany.',
      body: ''
    };
  }

  static successDeleteItem(): Toast {
    return {
      type: 'success',
      // title: 'Item deleted successfully',
      title: 'Wpis został usunięty.',
      body: ''
    };
  }

  static warningTemplateForRecordAlreadyAdded(): Toast {
    return {
      type: 'warning',
      // title: 'Template for the record already added',
      title: 'Pusty wpis został już stworzony.',
      body: ''
    };
  }
}
