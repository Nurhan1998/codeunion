import { Field, FormFields } from './types';

export const fieldsArray: Field<FormFields>[]  = [
  {
    name: 'name',
    placeholder: 'Name',
  },
  {
    name: 'email',
    placeholder: 'Email',
  },
  {
    name: 'image',
    placeholder: 'Enter link to img',
  },
];

export const defaultValues: FormFields = {
  name: '',
  email: '',
  image: ''
};