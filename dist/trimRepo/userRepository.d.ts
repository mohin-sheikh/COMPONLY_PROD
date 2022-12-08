import Users from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserRepository extends Repository<Users> {
    findUser(id: string): Promise<Users | "Not Found">;
}
