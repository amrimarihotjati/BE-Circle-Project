import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Threads } from "./Thread";


@Entity({name: "replies"})
export class Replies {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({nullable: true})
    image: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    update_at: Date;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    user_id: User;
    
    @ManyToOne(() => Threads, (thread) => thread.number_of_replies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    thread_id: Threads;
    
}