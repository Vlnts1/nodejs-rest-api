import * as yup from 'yup';

export const noteSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required(),
});
