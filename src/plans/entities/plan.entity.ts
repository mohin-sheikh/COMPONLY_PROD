import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Plans {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public subtitle: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column()
  public period: string;

  @Column()
  public features: string;

  @Column({
    default: false,
  })
  public is_deleted: boolean;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Plans;
