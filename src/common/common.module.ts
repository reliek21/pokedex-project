import { Module } from '@nestjs/common';
import { FetchAdapter } from './adapters/fetch.adapter';

@Module({
  providers: [ FetchAdapter],
  exports: [ FetchAdapter ]
})
export class CommonModule {}
