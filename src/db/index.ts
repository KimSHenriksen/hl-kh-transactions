import dotenv from 'dotenv'

import { Sequelize } from 'sequelize-typescript'

import { Transaction } from './models/Transaction'
import { PaymentNote } from './models/PaymentNote'

dotenv.config()

const connection: Sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql', // Requirement: MySQL Wire Protocol compatible
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    models: [Transaction, PaymentNote]
})

export default connection
export {Transaction, PaymentNote}
