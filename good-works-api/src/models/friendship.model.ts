import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  from: number;

  @Column({ nullable: false })
  to: number;

  @Column({ type: 'boolean', nullable: false })
  pending: boolean;
}
