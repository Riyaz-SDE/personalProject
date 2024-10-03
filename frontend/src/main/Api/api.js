const domainName = 'localhost'
const port = '5000'
const protocal = 'http://'

const domain = protocal + domainName + ':' + port

export const api = {
    test : `${domain}/test`,
    userRegisteration : `${domain}/post`,
    login : `${domain}/log`,
    userInfo : `${domain}/protected`, /* authentication-route */
    profileUpload : `${domain}/log/pic`,
    
}