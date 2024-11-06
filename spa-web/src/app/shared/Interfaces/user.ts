export interface UserData{
    getAllUsers: [user:User]
}

export interface User{
    ID: number,
    Name: string,
    MiddleName: string,
    LastName: string,
    Dni: string,
    Adult: boolean,
}