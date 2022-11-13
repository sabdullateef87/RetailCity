import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    MERCHANT = "merchant",
    REGULAR = "regular",
    CUSTOMER = "customer"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    user_id: number

    @Column({ nullable: false })
    @IsNotEmpty()
    firstname: string

    @Column({ nullable: false })
    @IsNotEmpty()
    lastname: string

    @Column({ unique: true })
    @IsNotEmpty()
    email: string

    @Column({ nullable: false })
    @IsNotEmpty()
    @Exclude()
    password: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.REGULAR
    })
    role: UserRole

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;


}