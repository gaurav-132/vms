import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Table } from "../../../components/ui/Table";
import { AddUserModal } from "../components/AddUserModal";
import { useUsers } from "../hooks/useUsers";

const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    {
        key: "status",
        header: "Status",
        render: (row) => (
            <span
                className={`rounded-full px-2 py-1 text-xs ${row.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
            >
                {row.status}
            </span>
        ),
    },
    {
        key: "actions",
        header: "Actions",
        render: () => <button className="text-indigo-600">Edit</button>,
    },
];

export function UsersPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { users, addUser, userCount } = useUsers();

    return (
        <section className="grid gap-4">
            <Card
                title="User Management"
                subtitle={`${userCount} team members in your tenant`}
            >
                <div className="mb-4 flex justify-end">
                    <Button onClick={() => setModalOpen(true)}>Add User</Button>
                </div>
                <Table columns={columns} data={users} />
            </Card>
            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={addUser}
            />
        </section>
    );
}
