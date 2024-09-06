import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  findAll() {
    return this.providerService.many({});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.one(id);
  }

  @Post()
  async create(
    @Body()
    { cnpj, contactId }: { name: string; cnpj: string; contactId: number },
  ) {
    return this.providerService.create(cnpj, contactId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    { cnpj, contactId }: { cnpj: string; contactId: number },
  ) {
    if (!cnpj && !contactId) return this.providerService.one(id);
    return this.providerService.update(id, { cnpj, contactId });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.delete(id);
  }
}
