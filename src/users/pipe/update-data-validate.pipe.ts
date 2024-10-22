import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { CustomException } from '@/response/custom.exception';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UpdateDataValidatePipe implements PipeTransform {
  transform(
    value: UpdateUserInfoDto & UpdateUserPasswordDto,
    metadata: ArgumentMetadata,
  ) {
    const requiredErrorList = [];
    const invalidRoleErrorList = [];

    if (metadata.metatype === UpdateUserInfoDto) {
      this.validateUserInfo(value, requiredErrorList, invalidRoleErrorList);
    }
    if (metadata.metatype === UpdateUserPasswordDto) {
      this.validateUserPassword(value, requiredErrorList);
    }

    if (requiredErrorList.length > 0) {
      throw new CustomException(
        'RequiredError',
        HttpStatus.BAD_REQUEST,
        requiredErrorList,
      );
    }

    if (invalidRoleErrorList.length > 0) {
      throw new CustomException(
        'InvalidRoleError',
        HttpStatus.BAD_REQUEST,
        invalidRoleErrorList,
      );
    }

    return value;
  }

  validateUserInfo(
    value: UpdateUserInfoDto,
    requiredErrorList: string[],
    invalidRoleErrorList: string[],
  ) {
    if (!value.email) requiredErrorList.push('email');
    if (!value.username) requiredErrorList.push('username');
    if (!value.role) requiredErrorList.push('role');
    else if (!(value.role in Object.values(Role)))
      invalidRoleErrorList.push('role');
  }

  validateUserPassword(
    value: UpdateUserPasswordDto,
    requiredErrorList: string[],
  ) {
    if (!value.password) requiredErrorList.push('password');
    if (!value.changePassword) requiredErrorList.push('changePassword');
  }
}
