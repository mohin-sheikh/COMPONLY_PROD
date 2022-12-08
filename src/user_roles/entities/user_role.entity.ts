import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User_Roles {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public role_id: number;

  @Column()
  public user_id: number;

  @Column()
  public company_id: number;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default User_Roles;
