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

    @Column({nullable: false})
    firstname: string

    @Column({nullable: false})
    lastname: string

    @Column({unique: true})
    email:string

    @Column({nullable: false})
    password:string

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