"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsController = void 0;
const common_1 = require("@nestjs/common");
const invitations_service_1 = require("./invitations.service");
const create_invitation_dto_1 = require("./dto/create-invitation.dto");
const response_message_config_1 = require("../config/response.message.config");
const swagger_1 = require("@nestjs/swagger");
const validation_pipe_1 = require("../users/pipes/validation.pipe");
const invitation_validator_1 = require("../validator/invitation.validator");
let InvitationsController = class InvitationsController {
    constructor(invitationsService) {
        this.invitationsService = invitationsService;
        this.logger = new common_1.Logger(invitations_service_1.InvitationsService.name);
    }
    async create(createInvitationDto) {
        try {
            const invitation = await this.invitationsService.create(createInvitationDto);
            return {
                status: common_1.HttpStatus.CREATED,
                message: response_message_config_1.message.sentInvitationSuccess,
                response: {
                    id: invitation.id,
                    admin_id: invitation.admin_id,
                    role_id: invitation.role_id,
                    company_id: invitation.company_id,
                    email: invitation.email,
                    status: invitation.status,
                },
            };
        }
        catch (error) {
            this.logger.log('create - ', error);
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
                response: {},
            };
        }
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe(invitation_validator_1.register)),
    (0, swagger_1.ApiBody)({ type: create_invitation_dto_1.CreateInvitationDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: response_message_config_1.message.sentInvitationSuccess,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invitation_dto_1.CreateInvitationDto]),
    __metadata("design:returntype", Promise)
], InvitationsController.prototype, "create", null);
InvitationsController = __decorate([
    (0, swagger_1.ApiTags)('INVITATIONS'),
    (0, common_1.Controller)('invitations'),
    __metadata("design:paramtypes", [invitations_service_1.InvitationsService])
], InvitationsController);
exports.InvitationsController = InvitationsController;
//# sourceMappingURL=invitations.controller.js.map