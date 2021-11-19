const bcrypt = require('bcrypt');

async function encryption(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt(10))
}

async function encValidate(plainPass: string, encPass: string) {
    console.log(">>>>>>>>>>>>>", plainPass, encPass)
    //plainPass = await encryption(plainPass)
    let valid = await bcrypt.compare(plainPass, encPass);
    console.log(">>>>>>>>>>>>>", valid)

    return (!valid)? false: true;
}


export { encryption, encValidate };