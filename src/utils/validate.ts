type TValidate = undefined | string
const required = (value:string):TValidate => !value ? 'Поле не может быть пустым' : undefined

const minLength = (len:number):Function => (val:string):TValidate => {
    if (val.length < len) {
        return `Минимальная длина - ${len} символов`
    }
}
const maxLength = (len:number):Function => (val:string):TValidate => {
    if (val.length > len) {
        return `Максимальная длина - ${len} символов`
    }
}

const email = (value:string):TValidate => {
    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
        return `Введите коректный email`
    }
}

export default {
    required,
    minLength,
    maxLength,
    email
}
