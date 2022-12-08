import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Invitations {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public admin_id: number;

  @Column()
  public company_id: number;

  @Column()
  public email: string;

  @Column()
  public role_id: number;

  @Column()
  public sent_at: Date;

  @Column({
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending',
  })
  public status: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Invitations;
