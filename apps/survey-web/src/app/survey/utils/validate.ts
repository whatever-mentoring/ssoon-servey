import { itemsType } from '../types/items.type';

export const validate = (
  type: itemsType,
  value: string | string[] | undefined
) => {
  switch (type) {
    case 'checkbox':
      if (typeof value === 'string') return true;
      if (!value) return true;
      if (value.length > 0) return false;
      return true;
    case 'textarea':
    case 'select':
    case 'radio':
      if (!value) {
        return true;
      }
      if (!value[0]) {
        return true;
      }
      return false;
  }
};
