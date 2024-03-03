export const validate = (
  type: 'radio' | 'select' | 'checkbox',
  value: string | string[] | undefined
) => {
  switch (type) {
    case 'checkbox':
      if (typeof value === 'string') return true;
      if (!value) return true;
      if (value.length > 0) return false;
      return true;
    case 'select':
    case 'radio':
      if (!value) {
        return true;
      }
      return false;
  }
};
