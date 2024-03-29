import { Module } from '@nestjs/common';

import { QueryUtils } from './query.util';

@Module({
  exports: [QueryUtils],
  providers: [QueryUtils],
})
export class UtilsModule {}
