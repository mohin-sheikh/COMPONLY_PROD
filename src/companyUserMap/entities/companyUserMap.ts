import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class companyUserMap {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public admin_id: number;

  @Column()
  public company_id: number;

  @Column({
    default: false,
  })
  public is_deleted: boolean;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default companyUserMap;
