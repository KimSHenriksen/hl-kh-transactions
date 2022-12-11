import {Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({timestamps: false, tableName: 'payment_note'})
export class PaymentNote extends Model {
    @Column({
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
      })
      public payment_note_uuid!: string

      @Column({
        type: DataTypes.DATE,
      })
      public payment_note_period_from_datetime!: Date

      @Column({
        type: DataTypes.DATE,
      })

      public payment_note_period_to_datetime!: Date

      @Column({
        type: DataTypes.DATE,
        allowNull: false
      })
      public payment_note_created_datetime!: Date


      @Column({
        type: DataTypes.INTEGER,
        defaultValue: 0
      })
      public payment_note_transactions_count?: number

      @Column({
        type: DataTypes.FLOAT,
        defaultValue: 0
      })
      public payment_note_value?: number

      @Column({
        type: DataTypes.ENUM('CREATING', 'COMPLETED'),
        defaultValue: 'CREATING'
      })
      public payment_note_status_code?: string
}