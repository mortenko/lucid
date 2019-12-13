/*
 * @adonisjs/lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/// <reference path="../../../../adonis-typings/index.ts" />

import { QueryClientContract } from '@ioc:Adonis/Lucid/Database'
import { ModelContract, BaseRelationNode, ModelConstructorContract } from '@ioc:Adonis/Lucid/Model'

import { HasOneOrMany } from '../HasOneOrMany'
import { HasManyQueryBuilder } from './QueryBuilder'

/**
 * Exposes the API to construct correct queries and set related
 * models for has many relationship
 */
export class HasMany extends HasOneOrMany {
  /**
   * Relationship type
   */
  public type = 'hasMany' as const

  constructor (relationName: string, options: BaseRelationNode, model: ModelConstructorContract) {
    super(relationName, options, model)
  }

  /**
   * Returns the query builder for has many relationship
   */
  protected $getQueryBuilder (client: QueryClientContract, parent: ModelContract | ModelContract[]): any {
    return new HasManyQueryBuilder(client.knexQuery(), this, client, parent)
  }

  /**
   * Returns query for the relationship with applied constraints
   */
  public getQuery (parent: ModelContract, client: QueryClientContract): any {
    return this.$getQueryBuilder(client, parent)
  }

  /**
   * Set many related instances
   */
  public setRelatedMany (parents: ModelContract[], related: ModelContract[]) {
    parents.forEach((parent) => {
      const relations = related.filter((model) => model[this.foreignKey] === parent[this.localKey])
      this.setRelated(parent, relations)
    })
  }
}