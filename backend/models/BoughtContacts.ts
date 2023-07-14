'use strict';
import { InferAttributes } from "sequelize"
import { Table, Model, Index, CreatedAt, Column, DataType } from 'sequelize-typescript'

export type BoughtContacts_Type = InferAttributes<BoughtContacts>

@Table
export default class BoughtContacts extends Model {
    @Column({
        type: DataType.INTEGER,
    })
    amount: number

    @Index
    @CreatedAt
    createdAt?: Date
}
