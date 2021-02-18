import Knex from "knex";

const knex = new Knex({
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
})

export default knex
