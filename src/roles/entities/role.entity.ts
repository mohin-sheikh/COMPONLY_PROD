import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Roles {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public title: string;

  @Column()
  @IsNotEmpty()
  public description: string;

  @Column()
  @IsNotEmpty()
  public permission: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Roles;
