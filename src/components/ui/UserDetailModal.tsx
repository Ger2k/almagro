import React from 'react';
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-4 rounded flex flex-row items-center" onClick={e => e.stopPropagation()}>
        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="mr-8 rounded-[50%] border-[3px] border-[#83DCD1]" />
        <div className="mr-8">
          <p>Nombre: {user.first_name}</p>
          <p>Apellido: {user.last_name}</p>
          <p>Email: {user.email}</p>              
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
