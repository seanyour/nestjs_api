import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column('time')
    createTime: string;

    @Column('time')
    updateTime: string;
}
