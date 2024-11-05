export interface UserData{
    getAllUsers: [{
        ID: number,
        Name: string,
        MiddleName: string,
        LastName: string,
        Dni: string,
        Adult: boolean,
        __typename: string
    }]
}