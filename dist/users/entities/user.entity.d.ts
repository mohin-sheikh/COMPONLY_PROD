declare class Users {
    id: number;
    full_name: string;
    email: string;
    alternate_email: string;
    password: string;
    hashPassword(): Promise<void>;
    stripe_customer_id: string;
    stripe_card_id: string;
    invitation_id: string;
    profile: string;
    otp: string;
    code_expiry: Date;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
}
export default Users;
