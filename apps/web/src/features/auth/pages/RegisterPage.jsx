import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { TENANT_TYPES } from '../../../utils/constants';
import { authService } from '../../../services/authService';

const defaultState = {
  organization: '',
  tenantType: TENANT_TYPES[0],
  email: '',
  password: '',
  confirmPassword: ''
};

export function RegisterPage() {
  const [form, setForm] = useState(defaultState);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) return;
    authService.register(form);
    authService.login({ email: form.email, organization: form.organization });
    navigate('/dashboard');
  };

  return (
    <AuthShell title="Create tenant account" subtitle="Set up your school, office, society, or organization.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input
          label="Organization Name"
          required
          value={form.organization}
          onChange={(event) => setForm((prev) => ({ ...prev, organization: event.target.value }))}
        />

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Tenant Type
          <select
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={form.tenantType}
            onChange={(event) => setForm((prev) => ({ ...prev, tenantType: event.target.value }))}
          >
            {TENANT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <Input
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        <Input
          label="Confirm Password"
          type="password"
          required
          value={form.confirmPassword}
          onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
        />

        <Button type="submit">Create Tenant</Button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already registered?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
