
import config from '../config'
import jwt from 'jsonwebtoken'

export default createToken = (id) =>{
    return jwt.sign({
        id
    }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    })
}