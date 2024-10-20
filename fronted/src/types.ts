export interface User {
    _id:string
    email:string;
    token: string;
    role: string;
    displayName:string;
    image: string | null;
}

export interface UserMutation {
    email:string;
    password:string;
    displayName:string;
    image: string | null;
}


export interface Photo {
    _id:string;
    name:string;
    image:string | null;
    user: {
        _id: string;
        name: string;
    };
}

export interface PhotoMutation {
    name:string;
    image:string | null;
}

export interface displayNameUser {
    displayName:string
}