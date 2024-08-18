import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/db/entities/user-entity';

@Injectable()
export class UserService {
  private manager: EntityManager;
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource
  ) {
    this.manager = this.dataSource.manager;
  }

  //create user
  async createUser(data: CreateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { email: data.email });
      
      if(user) {
        throw new Error('User is already exists, go to login');
      }

      const createUser = await this.manager.create(UserEntity, {
        email: data.email,
        name: data.name,
        password: data.password,
        mobile: data.mobile,
        gender: data.gender,
        date_of_birth: data.date_of_birth
      });

      await this.manager.save(UserEntity,createUser);

      return {message:'user created successfully',createUser};
    }catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
//   delete user 
async deleteUser(id: string) {
    try {
      const user = await this.manager.findOneBy(UserEntity, { id });
  
      if (!user) {
        throw new Error('User is not found');
      }
  
      await this.manager.delete(UserEntity, id);
      return "Delete user successfully";
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
  // get all user
  async getAllUser() {
    return await this.manager.find(UserEntity);
  }
//   get user by id
async getUserById(id: string) {
    try {
        const user = await this.manager.findOneBy(UserEntity, { id });

        if (!user) {
            throw new Error('Data is not found');
        }

        return { message: 'Get Data Successfully', data: user };
    } catch (error) {
        throw new NotFoundException(`${error.message}`);
    }
}

  
}
