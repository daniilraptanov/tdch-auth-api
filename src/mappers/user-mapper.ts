import { TypeMapper } from "ts-mapper";
import { IUserDTO } from "../types/dto/user-dto";
import { IUser } from "../types/models/user";
 
class UserMapper extends TypeMapper {
   constructor() {
      super();
      this.config();
   }
 
   private config(): void {
      this.createMap<IUser, IUserDTO>()
        .map(obj => obj.id, obj => obj.id)
        .map(obj => obj.email, obj => obj.email)
   }
}

export function userMapperFactory(src: IUser): IUserDTO {
    const userMapper = new UserMapper();

    const result: IUserDTO = { id: null, email: null };
    userMapper.map<IUser, IUserDTO>(src, result);

    return result;
}
