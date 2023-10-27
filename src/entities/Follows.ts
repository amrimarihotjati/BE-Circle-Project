import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";



@Entity()
export class Following {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    update_at: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    following_id: User

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    follower_id: User;

    
}