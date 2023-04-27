


export const formValidations = {
    email: [(value) => isValidEmail.test(value), 'El correo debe de ser un correo valido'],
    password: [(value) => value.length >= 6, 'El correo debe de ser minimo de 6 caracteres'],
    displayName: [(value) => value.trim().length >= 3, 'El nombre es obligatorio']
}

const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
