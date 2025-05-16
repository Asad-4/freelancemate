import React, { useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const AddClientForm = ({ onClientAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Client name is required');
      return;
    }

      try {
      setLoading(true);
      await addDoc(collection(db, 'clients'), {
        name,
        email,
        phone,
        notes,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setError(null);
      if (onClientAdded) onClientAdded();
    } catch (e) {
      console.error(e);
      setError('Failed to add client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddClient}>
      <h3>Add new Client</h3>
      <input
        type="text"
        value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
      ></input>
      <input
        type="email"
        value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
      ></input>
      <input
        type="tel"
        value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Phone number'
      ></input>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
      ></textarea>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Client'}
      </button>
    </form>
  );
};

export default AddClientForm;
