// import jwt from "jsonwebtoken";
let jwt = require('jsonwebtoken');
function generateToken(userInfo: any): string {
    return jwt.sign(userInfo, (process.env.SECRET_KEY || "jwtsectertkey"), { expiresIn: (process.env.TOKEN_EXPIRE_TIME || '24h') });
}

function validateToken(token: string) {
    try {
        let result = jwt.verify(token, (process.env.SECRET_KEY || "jwtsectertkey"));
        if(!result)return;
        return result ;
    } catch (ex) {
        console.log(ex)
        throw new Error("not valid token")
    }
}

function decodeToken(token: string): Boolean {
    try {
        let result = jwt.decode(token);
        let { name, mobile, account } = result;
        return true
    } catch (ex) {
        throw new Error("not valid token")
    }
}

export { generateToken, validateToken, decodeToken };