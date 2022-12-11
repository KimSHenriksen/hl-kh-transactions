import express, { Router } from 'express'

import {defaultRoute} from './defaultRoute'
import {paymentNoteRoute} from './paymentNoteRoute'

export const routes: Router = express.Router()

routes.use(defaultRoute)
routes.use(paymentNoteRoute)


