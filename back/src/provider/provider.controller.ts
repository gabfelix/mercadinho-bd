import { Body, Controller, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  async create(
    @Body()
    { cnpj, contactId }: { name: string; cnpj: string; contactId: number },
  ) {
    return this.providerService.create(cnpj, contactId);
  }
}
