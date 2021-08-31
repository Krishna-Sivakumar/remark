import * as mysql from 'mysql'
import { Comment, Status, sqlConfig } from './utils'

const createStatement = `
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER AUTO_INCREMENT,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    urlhash TEXT NOT NULL,
    parent INTEGER,
    CONSTRAINT pk_comments PRIMARY KEY (id),
    CONSTRAINT fk_parent FOREIGN KEY(parent) REFERENCES comments(id) ON DELETE CASCADE
);
`

const insertCommentWithParentStatement = `INSERT INTO comments(name, content, urlhash, parent) VALUES(?, ?, ?, ?);`

const insertCommentStatement = `INSERT INTO comments(name, content, urlhash) VALUES(?, ?, ?);`

const deleteCommentStatement = `DELETE FROM comments WHERE id = ?;`

const selectCommentsStatement = `SELECT * FROM comments WHERE urlhash = ?`

let connection = mysql.createPool(sqlConfig)

async function checkParent(id: number): Promise<boolean> {
    return false;
}

async function query(statement: string, values: any): Promise<[any, any]> {
    return new Promise((resolve, reject) => {
        connection.query(statement, values, (error, results, fields) => {
            if (error)
                reject(error)

            resolve([results, fields])
        })
    })
}

export async function insertComment(comment: Comment): Promise<Status> {
    try {
        if (comment.parent === null) {
            let [results, fields] = await query(insertCommentStatement, [comment.name, comment.content, comment.urlhash])
            return {
                success: true,
                message: "comment successfully inserted",
                id: null
            }
        } else {
            let [results, fields] = await query(
                insertCommentWithParentStatement,
                [comment.name, comment.content, comment.urlhash, comment.parent]
            )
            return {
                success: true,
                message: "comment successfully inserted",
                id: null
            }
        }
    } catch (err) {
        return {
            success: false,
            message: err.message,
            id: null
        }
    }
}

export async function deleteComment(id: number): Promise<Status> {
    return {
        success: false,
        message: "couldn't delete comment...",
        id: null
    }
}

export async function getComments(urlhash: string): Promise<any> {
    try {
        let [results, _] = await query(selectCommentsStatement, [urlhash]);
        return [results]
    } catch (err) {
        return [];
    }
}
