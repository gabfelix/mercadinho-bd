import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact, Prisma } from '@prisma/client';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(
    @Body() prismaCreateData: Prisma.ContactCreateInput,
  ): Promise<Contact> {
    return this.contactService.create(prismaCreateData);
  }
}
