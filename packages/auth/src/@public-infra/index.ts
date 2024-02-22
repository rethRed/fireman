
import { UserModule } from "../app/user.module"
import { UserEntity } from "../app/user.entity"

export { UserModule as AuthModule }

export const authTypeormEntities = [
    UserEntity
]
