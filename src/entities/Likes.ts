import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column, } from "typeorm";
import { User } from "./User";
import { Threads } from "./Thread";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Threads, (thread) => thread.id)
    @JoinColumn()
    thread_id: Threads;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user_id: User;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    update_at: Date;
}