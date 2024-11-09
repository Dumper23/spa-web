import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column()
  Name!: string;

  @Column({ nullable: true })
  MiddleName?: string;

  @Column({ nullable: true })
  LastName!: string;

  @Column()
  Dni!: string;

  @Column({ default: false })
  Adult!: boolean;

  @Column()
  Password!: string;
}
