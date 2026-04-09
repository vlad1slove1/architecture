import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775733341432 implements MigrationInterface {
    name = 'Init1775733341432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "display_name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_notes" ("user_id" uuid NOT NULL, "note_id" uuid NOT NULL, CONSTRAINT "UQ_8eea7722eb69b7c3ae425578fcd" UNIQUE ("note_id"), CONSTRAINT "PK_90bf669aff48ef336853fc183f0" PRIMARY KEY ("user_id", "note_id"))`);
        await queryRunner.query(`ALTER TABLE "user_notes" ADD CONSTRAINT "FK_d2a9cb672e3701a1f2692c034a4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_notes" ADD CONSTRAINT "FK_8eea7722eb69b7c3ae425578fcd" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_notes" DROP CONSTRAINT "FK_8eea7722eb69b7c3ae425578fcd"`);
        await queryRunner.query(`ALTER TABLE "user_notes" DROP CONSTRAINT "FK_d2a9cb672e3701a1f2692c034a4"`);
        await queryRunner.query(`DROP TABLE "user_notes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notes"`);
    }

}
