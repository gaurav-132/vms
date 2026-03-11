import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { USER_ROLES } from '../../../utils/constants';

const initialState = { name: '', email: '', role: USER_ROLES[0] };

export function AddUserModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
    setForm(initialState);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create team member">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Role
          <select
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={form.role}
            onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
          >
            {USER_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add User</Button>
        </div>
      </form>
    </Modal>
  );
}
