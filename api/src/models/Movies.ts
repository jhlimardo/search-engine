import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "movies",
  timestamps: false,
})
export class Movies extends Model<Movies> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  title!: string;

  @Column
  photo!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.TEXT)
  shortDescription!: string;
}
