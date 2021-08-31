import { readFileSync } from 'fs';

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

export let sqlConfig = JSON.parse(
    readFileSync("sqlConfig.json").toString()
);

export const parentNotFound = Error("parent comment not found in database")