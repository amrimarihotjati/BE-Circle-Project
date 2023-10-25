import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp, CreateDateColumn, OneToMany } from "typeorm"
import { User } from "./user"
import{ Like } from "./like"
import { Reply } from "./reply"

@Entity({name: "threads"})
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    content: string

    @Column({nullable:true})
    image: string

    @CreateDateColumn({type: "timestamp with time zone"})
    posted_at: Date;

    @ManyToOne(() => User, (user) => user.threads, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
    )
    users:User

    @OneToMany(() => Like, (like) => like.thread, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })

    likes:Like[]

    @OneToMany(() => Reply, (reply) => reply.thread, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })

    replies:Reply[]

}
