export const initialState = {
  contacts: [],       // لیست مخاطبین
  selectedIds: [],    // مخاطبین انتخاب‌شده برای حذف گروهی
  toast: '',          // پیام موفقیت
};

export function contactsReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, contacts: action.payload };

    case 'ADD':
      return { 
        ...state, 
        contacts: [...state.contacts, action.payload], 
        toast: '✅ مخاطب اضافه شد' 
      };

    case 'UPDATE':
      return { 
        ...state, 
        contacts: state.contacts.map(c => 
          c.id === action.payload.id ? action.payload : c
        ), 
        toast: '✅ مخاطب ویرایش شد' 
      };

    case 'DELETE':
      return { 
        ...state, 
        contacts: state.contacts.filter(c => c.id !== action.payload), 
        toast: '✅ مخاطب حذف شد' 
      };

    case 'DELETE_GROUP':
      return { 
        ...state, 
        contacts: state.contacts.filter(c => !state.selectedIds.includes(c.id)), 
        selectedIds: [], 
        toast: '✅ مخاطبین حذف شدند' 
      };

    case 'SELECT_TOGGLE':
      return { 
        ...state, 
        selectedIds: state.selectedIds.includes(action.payload) 
          ? state.selectedIds.filter(id => id !== action.payload) 
          : [...state.selectedIds, action.payload] 
      };

    case 'TOAST_CLEAR':
      return { ...state, toast: '' };

    default:
      return state;
  }
}