import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ProviderController],
  providers: [ProviderService, PrismaService],
})
export class ProviderModule {}
