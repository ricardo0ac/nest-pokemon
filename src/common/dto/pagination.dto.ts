import {
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  isNumber,
} from 'class-validator';

export class paginationDTO {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Min(1)
  @IsNumber()
  outset?: number;
}
