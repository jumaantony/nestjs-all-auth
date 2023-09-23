import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class profiles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ unique: true, nullable: true })
  @IsEmail()
  email?: string;

  @Column({ nullable: false })
  created_at: Date;
}
