import {PrismaClient} from '@prisma/client';

const prisma=new PrismaClient({
    log: [
        { level: 'query', emit: 'stdout' }, // Logs queries
        { level: 'info', emit: 'stdout' },  // Logs info messages
        { level: 'warn', emit: 'stdout' },  // Logs warnings
        { level: 'error', emit: 'stdout' }, // Logs errors
    ],
})

export default prisma