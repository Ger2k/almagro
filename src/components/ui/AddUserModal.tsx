import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddUserButton } from '@/components/ui/addUserButton';

interface AddUserModalProps {
  newUser: { first_name: string; last_name: string; email: string; role: string };
  setNewUser: (user: { first_name: string; last_name: string; email: string; role: string }) => void;
  formErrors: { first_name: string };
  onSubmit: () => void;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ newUser, setNewUser, formErrors, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full" onClick={onClose}>
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
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
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
          <Button onClick={onClose} variant="ghost">Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
