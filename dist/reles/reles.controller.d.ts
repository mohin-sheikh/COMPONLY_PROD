import { RelesService } from './reles.service';
import { CreateReleDto } from './dto/create-rele.dto';
import { UpdateReleDto } from './dto/update-rele.dto';
export declare class RelesController {
    private readonly relesService;
    constructor(relesService: RelesService);
    create(createReleDto: CreateReleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReleDto: UpdateReleDto): string;
    remove(id: string): string;
}
