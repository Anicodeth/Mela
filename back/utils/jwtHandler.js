
import config from '../config'
import jwt from 'jsonwebtoken'

const createToken = (id) =>{
    return jwt.sign({
        id
    }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    })
}

export default createToken;