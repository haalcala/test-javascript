import {Entity, ObjectIdColumn, ObjectID, Column, BaseEntity} from "typeorm";
import { type } from "os";

@Entity()
export class User extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column("text")
    email: string;

    @Column("text")
    password: string;

    @Column("text", {nullable: true})
    stripeId: string;

    @Column("text", {nullable: true})
    stripeToken: string;

    @Column("text", {default : "free-trial"})
    plan: string;
}
