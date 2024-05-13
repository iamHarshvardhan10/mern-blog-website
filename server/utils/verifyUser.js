import jwt from 'jsonwebtoken'

import { errorHandler } from './errorHandler.js'

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unthorized'))
    }

    jwt.verify(token, 'mern-blog-website', (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unathorized'))
        }
        req.user = user;
        next()
    })
}