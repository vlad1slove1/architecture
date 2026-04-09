import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserOrmEntity } from "../../../../modules/users/infrastructure/persistence/user.orm-entity.js";
import { seedConstants } from "../constants/seed.constants.js";

@Injectable()
export class SeedUserService {
    public constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepository: Repository<UserOrmEntity>,
    ) {}

    public async runUsers(): Promise<void> {
        for (let index = 1; index <= seedConstants.USER_COUNT; index += 1) {
            const email: string = `${seedConstants.EMAIL_PREFIX}${String(index)}${seedConstants.EMAIL_DOMAIN}`;

            const existing: UserOrmEntity | null = await this.userRepository.findOne({
                where: { email },
            });

            if (existing === null) {
                await this.userRepository.save(
                    this.userRepository.create({
                        email,
                        displayName: `Пользователь сида ${String(index)}`,
                    }),
                );
            }
        }
    }
}
