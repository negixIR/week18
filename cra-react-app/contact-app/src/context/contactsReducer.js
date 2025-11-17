export const initialState = {
  contacts: [],
  selectedIds: [],
  toast: '', // پیام موفقیت
};

export function contactsReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, contacts: action.payload };
    case 'ADD':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        toast: '✅ مخاطب با موفقیت اضافه شد',
      };
    case 'UPDATE':
      return {
        ...state,
        contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c),
        toast: '✅ مخاطب با موفقیت ویرایش شد',
      };
    case 'DELETE':
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload),
        selectedIds: state.selectedIds.filter(id => id !== action.payload),
        toast: '✅ مخاطب حذف شد',
      };
    case 'DELETE_GROUP':
      return {
        ...state,
        contacts: state.contacts.filter(c => !state.selectedIds.includes(c.id)),
        selectedIds: [],
        toast: '✅ مخاطبین انتخاب‌شده حذف شدند',
      };
    case 'SELECT_TOGGLE':
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter(id => id !== action.payload)
          : [...state.selectedIds, action.payload],
      };
    case 'SELECT_CLEAR':
      return { ...state, selectedIds: [] };
    case 'TOAST_CLEAR':
      return { ...state, toast: '' };
    default:
      return state;
  }
}