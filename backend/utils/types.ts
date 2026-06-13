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
createdAt: string,
title: string,
content: string,
likeCount: number
}

export type CommentDTO={
    message:string,
    postId: string,
    userId: string,
}
