import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { ContactService } from './contact/contact.service';
import { PrismaService } from './prisma.service';
import { ProviderModule } from './provider/provider.module';
import { ProviderService } from './provider/provider.service';
import { SaleModule } from './sale/sale.module';
import { SaleService } from './sale/sale.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ContactModule, ProviderModule, SaleModule],
  controllers: [AppController, ContactController],
  providers: [AppService, PrismaService, ContactService, ProviderService, SaleService],
})
export class AppModule {}
