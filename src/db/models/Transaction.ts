import {Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({timestamps: false, tableName: 'transaction'})
export class Transaction extends Model {
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true
  })
  public transaction_uuid!: string

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false
  })
  public transaction_status_code!: string

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false
  })
  public transaction_value!: number

  @Column({
    type: DataTypes.DATE,
    allowNull: false
  })
  public transaction_datetime!: Date

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false
  })
  public transaction_payment_note_uuid!: string
}
