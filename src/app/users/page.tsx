"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', role: '' });
  const [formErrors, setFormErrors] = useState({ first_name: '' });

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleAddUser = () => {
    const errors = { first_name: '' };
    if (newUser.first_name.length < 5) {
      errors.first_name = 'El nombre debe tener al menos 5 caracteres';
    }
    setFormErrors(errors);

    if (errors.first_name) {
      return;
    }

    axios.post('https://reqres.in/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setIsAddUserModalOpen(false);
        setNewUser({ first_name: '', last_name: '', email: '', role: '' });
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <button 
        className="bg-[#83DCD1] border border-[#83DCD1] rounded-[4px] opacity-100 text-white p-2 mb-4 hover:bg-[#61A89F]"
        onClick={() => setIsAddUserModalOpen(true)}
      >
        Añadir Usuario
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
              <td className="border px-4 py-2">{`${user.first_name} ${user.last_name}`}</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de detalles del usuario */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded flex flex-col items-center">
            <img className='mb-2' src={selectedUser.avatar} alt={`${selectedUser.first_name} ${selectedUser.last_name}`} />
            <p>Nombre: {selectedUser.first_name}</p>
            <p>Apellido: {selectedUser.last_name}</p>
            <p>Email: {selectedUser.email}</p>
            <button onClick={() => setSelectedUser(null)} className="bg-[#83DCD1] border border-[#83DCD1] rounded-[4px] opacity-100 text-white p-2 mt-4 hover:bg-[#61A89F]">Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal para añadir un nuevo usuario */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Añadir Nuevo Usuario</h2>
            <input 
              type="text"
              placeholder="Nombre"
              value={newUser.first_name}
              onChange={e => setNewUser({ ...newUser, first_name: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            {formErrors.first_name && <p className="text-red-500">{formErrors.first_name}</p>}
            <input 
              type="text"
              placeholder="Apellido"
              value={newUser.last_name}
              onChange={e => setNewUser({ ...newUser, last_name: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <input 
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <select 
              value={newUser.role}
              onChange={e => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-2 mb-4 w-full"
            >
              <option value="">Seleccionar Rol</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Design">Design</option>
            </select>
            <div className="flex flex-row-reverse gap-2">
              <button 
                onClick={handleAddUser}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Añadir Usuario
              </button>
              <button 
                onClick={() => setIsAddUserModalOpen(false)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
