import { CreateReleDto } from './dto/create-rele.dto';
import { UpdateReleDto } from './dto/update-rele.dto';
export declare class RelesService {
    create(createReleDto: CreateReleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReleDto: UpdateReleDto): string;
    remove(id: number): string;
}
