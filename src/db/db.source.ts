
import {ConfigService} from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user-entity';
export const Dbconnection=[
  {
    provide: 'DataSource',
    useFactory: async (ConfigService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: ConfigService.get('DB_HOST'),
        port: ConfigService.get('DB_PORT'),
        username: ConfigService.get('DB_USERNAME'),
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_NAME'),
        entities: [UserEntity],
        synchronize: true,
        logging: true
      })

      return await dataSource.initialize()
    },
    inject: [ConfigService]
  }
]
