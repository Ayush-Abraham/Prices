import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators'
import { immutableRelation } from '@nozbe/watermelondb/decorators'

export default class Price extends Model {
    static table = 'prices'
    static associations: {
        items: { type: 'belongs_to', key: 'item_id' },
        stores: { type: 'belongs_to', key: 'store_id' },
    }

    @field('cost') cost: any
    @text('noted_at') noted_at: any
    @text('item_id') item_id: any
    @text('store_id') store_id: any


    @immutableRelation('items', 'item_id') item: any
    @immutableRelation('stores', 'store_id') store: any
}