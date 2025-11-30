import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';
import Modal from './Modal';

function ContactTable() {
  const { state, dispatch } = useContacts();
  const { contacts, selectedIds, toast } = state;

  const [search, setSearch] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [modal, setModal] = useState({ show: false, id: null, group: false });
  const navigate = useNavigate();

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const toggleSelect = (id) => {
    dispatch({ type: 'SELECT_TOGGLE', payload: id });
  };

  const confirmDeleteSingle = (id) => {
    setModal({ show: true, id, group: false });
  };

  const confirmDeleteGroup = () => {
    setModal({ show: true, id: null, group: true });
  };

  const handleConfirm = () => {
    if (modal.group) {
      dispatch({ type: 'DELETE_GROUP' });
    } else if (modal.id) {
      dispatch({ type: 'DELETE', payload: modal.id });
    }
    setModal({ show: false, id: null, group: false });
    setMenuOpenId(null);
    setTimeout(() => dispatch({ type: 'TOAST_CLEAR' }), 2500);
  };

  return (
    <div className="card">
      <div className="toolbar">
        <input
          className="search"
          placeholder="جستجو بر اساس نام یا ایمیل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-danger"
          onClick={confirmDeleteGroup}
          disabled={selectedIds.length === 0}
        >
          🗑️ حذف گروهی
        </button>
      </div>

      {toast && <div className="success">{toast}</div>}

      <table className="contact-table">
        <thead>
          <tr>
            <th>✔️</th>
            <th>نام</th>
            <th>ایمیل</th>
            <th>شماره</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(c.id)}
                  onChange={() => toggleSelect(c.id)}
                />
              </td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <div className="menu-inline">
                  <button className="dots" onClick={() => toggleMenu(c.id)}>⋮</button>
                  {menuOpenId === c.id && (
                    <div className="menu-row">
                      <button className="btn btn-light" onClick={() => navigate('/add', { state: c })}>✏️ ویرایش</button>
                      <button className="btn btn-danger" onClick={() => confirmDeleteSingle(c.id)}>🗑️ حذف</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: '#777' }}>
                مخاطبی یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modal.show && (
        <Modal
          message={modal.group ? 'حذف مخاطبین انتخاب‌شده؟' : 'حذف این مخاطب؟'}
          onConfirm={handleConfirm}
          onCancel={() => setModal({ show: false, id: null, group: false })}
        />
      )}
    </div>
  );
}

export default ContactTable;