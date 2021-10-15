import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('0123456',10),
        isAdmin: true,
    },
    {
        name: 'Micheal Henry',
        email: 'micheal@example.com',
        password: bcrypt.hashSync('0123456',10),
    },
    {
        name: 'Adrian Mylor',
        email: 'adrian@example.com',
        password: bcrypt.hashSync('0123456',10),
    },

]

export default users