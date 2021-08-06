import regulars from './regulars';

export const required = (v: string) => (!v || v.toString().trim() === '' ? 'Required' : undefined);

export const requiredEmail = (v: string) =>
  required(v) ? required(v) : !regulars.email.test(v) ? 'Incorrect email format' : undefined;
export const requiredMinLenght = (v: string) =>
  required(v) ? required(v) : v.length < 6 ? 'Minimum password length is 6 symbols ' : undefined;
