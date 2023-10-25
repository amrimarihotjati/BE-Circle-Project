import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user"

@Entity({ name: "followings" })
export class Following {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.followings, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "followed_id" }) // Ini adalah relasi "followed"
    followed: User 

    @ManyToOne(() => User, (user) => user.followers, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "follower_id" }) // Ini adalah relasi "follower"
    follower: User 
}

