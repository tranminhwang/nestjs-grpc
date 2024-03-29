import { plainToClass } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { isEmpty } from 'lodash';

class EnvironmentVariables {
  // Database configuration
  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsString()
  @IsOptional()
  POSTGRES_SCHEMA: string;
}

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export default function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (!isEmpty(errors)) throw new Error(errors.toString());
  return validatedConfig;
}
