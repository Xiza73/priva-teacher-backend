import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

export const handleDbException = (error: any) => {
  console.error(error);
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = Object.values(error.keyValue)[0];
    throw new ConflictException(`The ${field} '${value}' already exists`);
  }
  throw new InternalServerErrorException(
    error && error.message
      ? error.message
      : "Something went wrong. Please try again later",
  );
};
