import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Thread } from "./thread"
import { User } from "./user"

@Entity({name: "replies"})
export class Reply {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    reply: string

    @ManyToOne(() => Thread, (thread) => thread.replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    thread: Thread

    @ManyToOne(() => User, (user) => user.replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    user: User
}
