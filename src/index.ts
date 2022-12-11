import express, { Application } from 'express'
import dotenv from 'dotenv'

import connection from './db'
import {routes} from './routes'

dotenv.config()

// DB access
connection.sync()

const app: Application = express()
app.use(express.json())
app.use('/', routes)

const port = process.env.APP_PORT || 3000

app.listen(port, () => console.log(`Use PORT ${port}`))

