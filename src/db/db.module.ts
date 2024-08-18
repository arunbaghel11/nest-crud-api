import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Dbconnection } from './db.source';

@Module({
  imports: [ConfigModule],
  providers: [...Dbconnection],
  exports: [...Dbconnection],
})
export class DbModule {}
