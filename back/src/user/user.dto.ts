export type CreateUserDto = {
  name?: string;
  email: string;
  password: string;
  encodedProfilePicture?: string;
};
export type UpdateUserDto = Partial<CreateUserDto>;
/** Type used for sending a user as a response */
export type ExportUserDto = CreateUserDto;
