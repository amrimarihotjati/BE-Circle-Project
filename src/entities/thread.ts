import { 
  Entity, 
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Replies } from "./Replies";
import { Likes } from "./Likes";
import { User } from "./user";


@Entity({name: "threads"})
export class Threads{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({nullable: true})
    image: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.threads, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    @JoinColumn()
    created_by: User;

    @OneToMany(() => Replies, (replie) => replie.thread_id, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    @JoinColumn()
    number_of_replies: Replies[];

    @OneToMany(() => Likes, (like) => like.thread_id, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    @JoinColumn()
    like: Likes[];

}