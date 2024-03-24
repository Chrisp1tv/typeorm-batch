import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class People {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;
}
