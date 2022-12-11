import { Request, Response, Router} from 'express'

export const defaultRoute = Router()

/**
 * An endpoint to check service is running
 */
defaultRoute.get('/', (req: Request, res: Response): Response => {
    return res.json({message: 'Service Running'})
})
