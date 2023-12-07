import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Threads } from "./Thread";



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    photo_profile: string;

    @Column({nullable: true})
    bio: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @OneToMany(() => Threads, (thread) => thread.created_by,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    threads: Threads[]

}