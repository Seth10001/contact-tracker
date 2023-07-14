'use strict';
import { InferAttributes } from "sequelize"
import { Table, Model, Index, CreatedAt } from 'sequelize-typescript'

export type ChangedContact_Type = InferAttributes<ChangedContact>

@Table
export default class ChangedContact extends Model {
    @Index
    @CreatedAt
    createdAt?: Date
}
