import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // 자동 증가 ID

  @Column({ unique: true })
  username: string; // 유저이름

  @Column()
  password: string; // 비밀번호
}
