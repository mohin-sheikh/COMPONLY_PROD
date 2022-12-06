import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Companies {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public logo: string;

  @Column()
  public seats: number;

  @Column()
  public created_by: string;

  @Column({
    default: false,
  })
  public is_deleted: boolean;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Companies;
