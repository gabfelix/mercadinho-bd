export type CreateUserDto = {
  name?: string;
  email: string;
  password: string;
  encodedProfilePicture?: string;
};

export type UpdateUserDto = Partial<CreateUserDto>;
