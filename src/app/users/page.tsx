"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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

  const closeModal = () => {
    setSelectedUser(null);
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <Button 
        className="bg-[#83DCD1] border border-[#83DCD1] rounded-[4px] opacity-100 text-white p-2 mb-4 hover:bg-[#61A89F]"
        onClick={() => setIsAddUserModalOpen(true)}
        variant="outline">Añadir Usuario
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 font-bold">Nombre</TableHead>
            <TableHead className="py-2 font-bold">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
              <TableCell className="border px-4 py-2">{`${user.first_name} ${user.last_name}`}</TableCell>
              <TableCell className="border px-4 py-2">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de detalles del usuario */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white p-4 rounded flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img src={selectedUser.avatar} alt={`${selectedUser.first_name} ${selectedUser.last_name}`} className="mb-4 rounded-[50%]" />
            <p>Nombre: {selectedUser.first_name}</p>
            <p>Apellido: {selectedUser.last_name}</p>
            <p>Email: {selectedUser.email}</p>
            <Button 
              onClick={() => setSelectedUser(null)} 
              className="bg-[#83DCD1] border border-[#83DCD1] rounded-[4px] opacity-100 text-white p-2 mt-4 hover:bg-[#61A89F] hover:text-black"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

      {/* Modal para añadir un nuevo usuario */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full" onClick={closeModal}>
          <div className="bg-white p-4 rounded w-[700px]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl mb-4">Añadir Nuevo Usuario</h2>
            {formErrors.first_name && <p className="text-red-500 italic">{formErrors.first_name}</p>}
            <input 
              type="text"
              placeholder="Nombre"
              value={newUser.first_name}
              onChange={e => setNewUser({ ...newUser, first_name: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
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
              onChange={
              e => setNewUser({ ...newUser, email: e.target.value })}
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
            <div className='flex flex-row-reverse gap-2'>              
              <Button 
                className="bg-[#83DCD1] border border-[#83DCD1] rounded-[4px] opacity-100 text-white p-2 hover:bg-[#61A89F]"
                onClick={handleAddUser}
                variant="outline">Añadir Usuario
              </Button>
              <Button 
                onClick={() => setIsAddUserModalOpen(false)}
                className=" text-black p-2 rounded"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
