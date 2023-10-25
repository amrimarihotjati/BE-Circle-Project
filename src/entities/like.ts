import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Thread } from "./thread"
import { User } from "./user"

@Entity({name: "likes"})
export class Like {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Thread, (thread) => thread.likes,{
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    thread: Thread

    @ManyToOne(() => User, (user) => user.likes,{
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    user: User
}
