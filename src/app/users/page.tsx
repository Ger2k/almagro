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
import UserDetailModal from '@/components/ui/UserDetailModal';
import AddUserModal from '@/components/ui/AddUserModal';
import Image from 'next/image';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';
import { toast } from '@/components/ui/use-toast';
import { useToast } from "@/components/ui/use-toast"


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
  const [formErrors, setFormErrors] = useState({ first_name: '', email: '' });
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast()

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

  const handleAddUser = () => {
    const errors = { first_name: '', email: '' };
  
    if (newUser.first_name.length < 5) {
      errors.first_name = 'El nombre debe tener al menos 5 caracteres';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
  
    if (errors.first_name || errors.email) {
      setFormErrors(errors);
      return;
    }

    toast({
      title: "Usuario añadido correctamente",
    })
  
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers([...users, data]);
        setIsAddUserModalOpen(false);
        setNewUser({ first_name: '', last_name: '', email: '', role: '' });
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };
  
  const handleDeleteUser = () => {
    if (userToDelete) {
      fetch(`https://reqres.in/api/users/${userToDelete.id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setUsers(users.filter(user => user.id !== userToDelete.id));
          setIsConfirmDeleteModalOpen(false);
          setUserToDelete(null);
          toast({
            title: "Usuario eliminado correctamente",
          })
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };
  const closeModal = () => {
    setSelectedUser(null);
    setIsAddUserModalOpen(false);
    setIsConfirmDeleteModalOpen(false);
    setUserToDelete(null);
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
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => setSelectedUser(user)}
                  variant="default"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
                </Button>
                <Button 
                onClick={() => {
                  setUserToDelete(user);
                  setIsConfirmDeleteModalOpen(true);
                }} 
                variant="default"
                className="ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}

      {isAddUserModalOpen && (
        <AddUserModal 
        newUser={newUser}
        setNewUser={setNewUser}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        onSubmit={handleAddUser}
        onClose={closeModal}
      />
      )}
      {isConfirmDeleteModalOpen && (
        <ConfirmDeleteModal 
          onConfirm={handleDeleteUser}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Users;
