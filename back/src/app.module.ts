import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { ProviderService } from './provider/provider.service';
import { ProviderModule } from './provider/provider.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ContactModule, ProviderModule, ProductModule],
  controllers: [AppController, ContactController, ProductController],
  providers: [
    AppService,
    PrismaService,
    ContactService,
    ProviderService,
    ProductService,
  ],
})
export class AppModule {}
