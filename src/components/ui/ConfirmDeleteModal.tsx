import React from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-4 rounded" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl mb-4">Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={onClose} variant="ghost">Cancelar</Button>
          <Button onClick={onConfirm} variant="destructive">Eliminar</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
