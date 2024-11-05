import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Users extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID!: number;

    @Column()
    Name!: string;

    @Column()
    MiddleName!: string;

    @Column()
    LastName!: string;

    @Column()
    Adult!: boolean;

    @Column()
    Dni!: string;
}