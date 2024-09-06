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
import { Contact, Prisma } from '@prisma/client';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactService.many({});
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactService.one(id);
  }

  @Post()
  async create(
    @Body() prismaCreateData: Prisma.ContactCreateInput,
  ): Promise<Contact> {
    return this.contactService.create(prismaCreateData);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() prismaUpdateData: Prisma.ContactUpdateInput,
  ): Promise<Contact> {
    return this.contactService.update(id, prismaUpdateData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactService.delete(id);
  }
}
