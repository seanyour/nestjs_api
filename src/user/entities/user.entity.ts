import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hashSync} from 'bcryptjs';
import {Exclude} from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nickname: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column('simple-enum', {enum: ['root','admin','user']})
    role: string;

    @Column({default: true})
    isActive: boolean;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createTime: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateTime: Date;

    @BeforeInsert()
    bcryptPwd() {
        this.password = hashSync(this.password);
    }
}
