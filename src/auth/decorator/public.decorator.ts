import { SetMetadata } from '@nestjs/common';
import constants from '../../config/constants';

export const Public = () => SetMetadata(constants.app.public, true);
