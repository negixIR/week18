import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';

function ContactForm() {
  const { state, dispatch } = useContacts();
  const navigate = useNavigate();
  const location = useLocation();
  const editingContact = location.state || null;

  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) setForm(editingContact);
  }, [editingContact]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'نام الزامی است';
    if (!form.email.includes('@')) errs.email = 'ایمیل معتبر نیست';
    if (!/^\d{10,}$/.test(form.phone)) errs.phone = 'شماره معتبر نیست';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (form.id) {
      dispatch({ type: 'UPDATE', payload: form });
    } else {
      dispatch({ type: 'ADD', payload: { ...form, id: Date.now() } });
    }
    navigate('/');
  };

  return (
    <div className="card">
      <h3>{form.id ? 'ویرایش مخاطب' : 'افزودن مخاطب'}</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="نام و نام خانوادگی"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          placeholder="ایمیل"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          placeholder="شماره تماس"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <button className="btn btn-primary" type="submit">
          {form.id ? 'ثبت ویرایش' : 'افزودن مخاطب'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;