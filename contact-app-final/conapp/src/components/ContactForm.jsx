import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';
import InputField from './InputField';

const schema = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  phone: yup.string().matches(/^\d{10,}$/, "شماره معتبر نیست").required("شماره الزامی است"),
});

function ContactForm() {
  const { dispatch } = useContacts();
  const navigate = useNavigate();
  const location = useLocation();
  const editingContact = location.state || null;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', phone: '' }
  });

  useEffect(() => {
    if (editingContact) reset(editingContact);
  }, [editingContact, reset]);

  const onSubmit = (data) => {
    if (editingContact) {
      dispatch({ type: 'UPDATE', payload: { ...data, id: editingContact.id } });
    } else {
      dispatch({ type: 'ADD', payload: { ...data, id: Date.now() } });
    }
    navigate('/');
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <InputField label="نام" name="name" register={register} errors={errors} placeholder="نام و نام خانوادگی" />
      <InputField label="ایمیل" name="email" register={register} errors={errors} placeholder="ایمیل" />
      <InputField label="شماره تماس" name="phone" register={register} errors={errors} placeholder="شماره تماس" />
      <button type="submit" className="btn btn-primary">
        {editingContact ? 'ثبت ویرایش' : 'افزودن مخاطب'}
      </button>
    </form>
  );
}

export default ContactForm;