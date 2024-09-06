import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { ProviderService } from './provider/provider.service';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [UserModule, ContactModule, ProviderModule],
  controllers: [AppController, ContactController],
  providers: [AppService, PrismaService, ContactService, ProviderService],
})
export class AppModule {}
