import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Companies_plans {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public company_id: number;

  @Column()
  public plan_id: number;

  @Column()
  public bought_at: Date;

  @Column()
  public admin_id: number;

  @Column()
  public status: string;

  @Column()
  public updated_by: number;

  @Column({
    default: false,
  })
  public is_deleted: boolean;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Companies_plans;
