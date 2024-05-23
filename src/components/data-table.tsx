import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }



export default function DataTable() {
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
  return (
    <>
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
    </>
  );
}}