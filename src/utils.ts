export type Comment = {
    id: number,
    name: string,
    content: string,
    urlhash: string,
    parent: number
}

export interface Status {
    success: boolean,
    message: string,
    id: number,
}

export let sqlConfig = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'user',
    password: 'secret',
    database: 'my_db'
}

export const parentNotFound = Error("parent comment not found in database")