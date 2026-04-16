import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPassHashAndRoleToUsers1776364315855 implements MigrationInterface {
    name = 'AddPassHashAndRoleToUsers1776364315855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
    }

}
