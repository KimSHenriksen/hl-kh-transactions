import {v4 as uuidv4} from 'uuid'
import express, {Request, Response, Router} from 'express'
import sequelize, { Op } from 'sequelize'

import connection, { Transaction, PaymentNote } from '../db'

export const paymentNoteRoute: Router = express.Router()

type PaymentNoteHandlerRequest = Request<{}, {}, {}, { period_from_datetime : string, period_to_datetime : string}>

/**
 * Update transactions with paymentNote and update paymentNote with sum and count over transactions.
 * Wrap it in a `Sequelize Managed Transaction`.
 * 
 * @param paymentNote PaymentNote to update
 */
async function completePaymentNoteTransaction (paymentNote: PaymentNote): Promise<void> { 
    try {
        const filter = {
            transaction_datetime: {
                [Op.gte]: paymentNote.payment_note_period_from_datetime,
                [Op.lte]: paymentNote.payment_note_period_to_datetime,
            },
            transaction_status_code: 'PENDING'
        }
        const _result = await connection.transaction( async (t) => { 
            const valueSum = await Transaction.findOne({
                attributes: [[sequelize.fn('SUM', sequelize.col('transaction_value')), 'valueSum']],
                where: filter,
                transaction: t
            })

            const rowsAffected = await Transaction.update({
                transaction_status_code: 'PAID',
                transaction_payment_note_uuid: paymentNote.payment_note_uuid,
            }, {
                where: filter,
                transaction: t
            })

            paymentNote.payment_note_transactions_count = rowsAffected[0]
            paymentNote.payment_note_value = valueSum?.dataValues.valueSum || 0
            paymentNote.payment_note_status_code = 'COMPLETED'
            await paymentNote.save()
        })
    } catch (error) {
        // Could mark paymentNote as failed
    }
}

/**
 * Create PaymentNote, update Transactions and finally update PaymentNote with results and status
 */
paymentNoteRoute.get('/create_payment_note', async (req: PaymentNoteHandlerRequest, res: Response): Promise<Response> => {
    try {
        const paymentNoteEntry: PaymentNote = await PaymentNote.create({
            payment_note_uuid: uuidv4(), 
            payment_note_period_from_datetime: new Date(req.query.period_from_datetime), 
            payment_note_period_to_datetime: new Date(req.query.period_to_datetime), 
            payment_note_created_datetime: new Date(Date.now())
        })

        completePaymentNoteTransaction(paymentNoteEntry)

        return res.status(200).json({message: 'Created payment note', paymentId: paymentNoteEntry.payment_note_uuid})
    } catch (error) {
        return res.status(400).json({message: 'Failed to create PaymentNote'})
    }
})

/**
 * Return a list of all PaymentNotes - only return uuids
 */
paymentNoteRoute.get('/all_payment_notes', async (req: Request, res: Response): Promise<Response> => {
    const allPaymentNotes: PaymentNote[] = await PaymentNote.findAll({attributes: ['payment_note_uuid']})
    return res.status(200).json(allPaymentNotes)
})

/**
 * Return PaymentNote and list of associated Transactions for a payment_note_uuid
 */
paymentNoteRoute.get('/payment_note/:paymentNoteId', async (req: Request, res: Response): Promise<Response> => {
    try {
        const paymentNote: PaymentNote | null = await PaymentNote.findOne({where: {payment_note_uuid: req.params.paymentNoteId}})
        if (!paymentNote) {
            throw new Error('Unknown PaymentNote uuid')
        }
        const allPaymentNoteTransactions: Transaction[] = await Transaction.findAll({
            where: {
                transaction_payment_note_uuid: req.params.paymentNoteId
            }
        })
        return res.status(200).json({
            transactions: allPaymentNoteTransactions,
            paymentNote
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({message: error.message})
        } else {
            return res.status(400).json({message: 'Undefined error'})
        }
    }
})
