import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public full_name: string;

  @Column()
  public email: string;

  @Column()
  public alternate_email: string;

  @Column()
  public password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Column()
  public stripe_customer_id: string;

  @Column()
  public stripe_card_id: string;

  @Column()
  public invitation_id: string;

  @Column()
  public profile: string;

  @Column()
  public otp: string;

  @Column()
  public code_expiry: Date;

  @Column({
    default: false,
  })
  public is_deleted: boolean;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Users;
