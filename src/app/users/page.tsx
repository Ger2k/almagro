"use client";

import { useState, useEffect } from 'react';
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
import { AddUserButton } from '@/components/ui/addUserButton';


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
    fetch('https://reqres.in/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);  

  const closeModal = () => {
    setSelectedUser(null);
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="container md:mt-0 mt-16 mx-auto p-4 m-auto">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <Button 
        onClick={() => setIsAddUserModalOpen(true)}
        variant="default">Añadir Usuario
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
              <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de detalles del usuario */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white p-4 rounded flex flex-row items-center" onClick={e => e.stopPropagation()}>
            <img src={selectedUser.avatar} alt={`${selectedUser.first_name} ${selectedUser.last_name}`} className="mr-8 rounded-[50%] border-[3px] border-[#83DCD1]" />
            <div className="mr-8">
              <p>Nombre: {selectedUser.first_name}</p>
              <p>Apellido: {selectedUser.last_name}</p>
              <p>Email: {selectedUser.email}</p>              
            </div>
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
            >
              <option value="">Seleccionar Rol</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Design">Design</option>
            </select>
            <div className='flex flex-row-reverse gap-2'>
              <AddUserButton />
              <Button 
                onClick={() => setIsAddUserModalOpen(false)}
                variant="ghost"
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
