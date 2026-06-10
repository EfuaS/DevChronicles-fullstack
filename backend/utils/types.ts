export type UserDTO ={
    username : string,
    password: string,
    email: string,
}
export type RegisterUserDTO ={
    username : string,
    password: string,
    email: string,
}
export type LoginUserDTO ={
    password: string,
    email: string,
}

export type PostDTO = {
userId: string,
created_At: string,
title: string,
content: string
}