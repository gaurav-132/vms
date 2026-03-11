const initialUsers = [
    {
        id: 1,
        name: "Ava Johnson",
        email: "ava@northschool.edu",
        role: "Admin",
        status: "Active",
    },
    {
        id: 2,
        name: "Liam Patel",
        email: "liam@northschool.edu",
        role: "Security",
        status: "Active",
    },
    {
        id: 3,
        name: "Sophia Lee",
        email: "sophia@northschool.edu",
        role: "Receptionist",
        status: "Pending",
    },
];

export const userService = {
    list() {
        return initialUsers;
    },
};
