import { Column, PrimaryColumn } from "typeorm";

export class File {
  @PrimaryColumn()
  id: string;
}
