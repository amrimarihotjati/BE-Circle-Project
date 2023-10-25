import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Thread } from "./thread"
import { Like } from "./like"
import { Following } from "./following"
import { Reply } from "./reply"

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    full_name: string
    
    @Column()
    email: string
    
    @Column()
    password: string
    
    @Column()
    profile_picture: string
    
    @Column()
    profile_description: string

    @OneToMany(() => Thread, (thread) => thread.users, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    threads: Thread[]

    @OneToMany(() => Like, (like) => like.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    likes:Like[]

    @OneToMany(() => Reply, (reply) => reply.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    replies:Reply[]

    @OneToMany(() => Following, (following) => following.followed, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    followings:Following[]

    @OneToMany(() => Following, (follower) => follower.follower, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    followers:Following[]
}
