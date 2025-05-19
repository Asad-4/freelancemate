import React, { useEffect, useState } from 'react';

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

import { db, auth } from '../firebase';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editClientId, setEditClientId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const q = query(
      collection(db, 'clients'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const startEdit = (client) => {
    setEditClientId(client.id);

    setFormData({
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      notes: client.notes || '',
    });
  };

  const cancelEdit = () => {
    setEditClientId(null);
    setFormData({ name: '', email: '', phone: '', notes: '' });
  };

  const saveEdit = async () => {
      try {
      const docRef = doc(db, 'clients', editClientId);
      await updateDoc(docRef, {
        ...formData,
      });
      cancelEdit();
    } catch (e) {
      console.error('Failed to update client', e);
    }
  };
    
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this client?");
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, "clients", id));
        }
        catch (error) {
            console.error('Failed to delete client:', error);
        }
  }

  if (loading) return <p>Loading clients...</p>;
  if (!clients.length) return <p>No clients yet.</p>;

  return (
    <>
      <div>
        <h3>Your clients</h3>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {editClientId === client.id ? (
                <>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone"
                  />
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Notes"
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{client.name}</strong>
                  <br />
                  {client.email && (
                    <span>
                      Email: {client.email}
                      <br />
                    </span>
                  )}
                  {client.phone && (
                    <span>
                      Phone: {client.phone}
                      <br />
                    </span>
                  )}
                  {client.notes && (
                    <span>
                      Notes: {client.notes}
                      <br />
                    </span>
                  )}
                  <button onClick={() => startEdit(client)}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    style={{ color: 'red' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ClientList;
