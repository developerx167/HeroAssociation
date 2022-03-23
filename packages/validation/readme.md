## usage :
    const Validation = require('@heroassociation/validation')
    const validate = new Validation(firstName,lastName,email,username,password)
    const notValid = Object.entries(result).filter([key,value]=>!value)
    if(notValid){
        <!-- do something  -->
    }
