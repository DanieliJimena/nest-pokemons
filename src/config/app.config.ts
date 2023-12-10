export const EnvConfiguration = () =>({
    environment:process.env.NODE_ENV ||'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    default_limit : +process.env.DEFAULT_LIMIT || 7
    //En el caso del default_limit, se le agrega el + porque viene como string y lo requerimos como numero
})