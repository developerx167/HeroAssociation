const validator = require('validator')
class Validation{
    constructor(firstName,lastName,email,username,password){
        this.firstName = this.checkName(firstName) 
        this.lastName = this.checkName(lastName)
        this.email = this.checkEmail(email)
        this.username = this.checkUsername(username)
        this.password = this.checkPassword(password)
    }
    checkName(s){
        if(!s) return false
        s=s.trim()
        s = s.toLowerCase()
        s=s.replaceAll(/\.+/gi,'.')
        s=s.replaceAll(/\s+/gi,' ')
        if(s.match(/^\./)) return false
        if(s.length < 2 || s.length > 20) return false
        if(validator.isAlpha(s,['en-US'],{ignore : ' .'})) return s
        return false
    }
    checkEmail(s){
        if(!s) return false
        s = s.trim()
        s = s.toLowerCase()
        if(s.length < 5 || s.length > 100) return false
        if(validator.isEmail(s)) return s
        return false
    }
    checkUsername(s){
        if(!s) return false
        s = s.trim()
        s = s.toLowerCase()
        if(s.length < 5 || s.length > 20) return false
        if(s.match(/^([a-z](\.|\-|\_)?)+([a-z0-9]+(\.|\-|\_)?)+$/)) return s
        return false
    }
    checkPassword(s){
        if(!s) return false
        if(s.length < 6 || s.length > 20) return false
        return s
    }
}

module.exports = Validation