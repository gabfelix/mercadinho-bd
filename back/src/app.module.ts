import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { ContactService } from './contact/contact.service';
import { CustomerModule } from './customer/customer.module';
import { DeliveryModule } from './delivery/delivery.module';
import { EmployeeModule } from './employee/employee.module';
import { PrismaService } from './prisma.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { ProviderModule } from './provider/provider.module';
import { ProviderService } from './provider/provider.service';
import { SaleController } from './sale/sale.controller';
import { SaleModule } from './sale/sale.module';
import { SaleService } from './sale/sale.service';

@Module({
  imports: [
    ContactModule,
    ProviderModule,
    ProductModule,
    EmployeeModule,
    DeliveryModule,
    CustomerModule,
    SaleModule,
  ],
  controllers: [
    AppController,
    ContactController,
    ProductController,
    SaleController,
  ],
  providers: [
    AppService,
    PrismaService,
    ContactService,
    ProviderService,
    ProductService,
    SaleService,
  ],
})
export class AppModule {}
