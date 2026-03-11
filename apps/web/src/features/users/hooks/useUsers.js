import { useMemo, useState } from 'react';
import { userService } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState(userService.list());

  const userCount = useMemo(() => users.length, [users]);

  const addUser = (payload) => {
    setUsers((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        ...payload,
        status: 'Active'
      }
    ]);
  };

  return { users, addUser, userCount };
}
