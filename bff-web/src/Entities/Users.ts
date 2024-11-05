import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  ID!: number;  // Auto-incremented primary key

  @Column()
  Name!: string;  // User's name

  @Column({ nullable: true })
  MiddleName?: string;  // User's middle name (optional)

  @Column()
  LastName!: string;  // User's last name

  @Column()
  Dni!: string;  // User's DNI (national identification number)

  @Column({ default: false })
  Adult!: boolean;  // User's adult status (default is false)
}
