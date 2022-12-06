import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { CreateDto } from './dto/create.dto';
import { Payload } from 'src/auth/types/payload';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: any): Promise<User>;
    findByPayload(payload: Payload): Promise<User>;
    create(userDTO: CreateDto): Promise<User>;
    add(user: any): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: any): Promise<User>;
    update(id: any, modify: any): Promise<import("typeorm").UpdateResult>;
    findUserDetail(id: string): Promise<User>;
}
