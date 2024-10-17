import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'progress_challenge' })
export class PregressChallenge {
  @PrimaryGeneratedColumn('increment')
  public id: number;
}
