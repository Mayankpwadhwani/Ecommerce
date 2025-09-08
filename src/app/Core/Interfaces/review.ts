import { Users } from "./User"

export interface Review{
    id:number,
    user:Users,
    comment:string,
    createdAt:Date
}

