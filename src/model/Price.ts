import { Model } from '@nozbe/watermelondb';
// import { immutableRelation } from '@nozbe/watermelondb/decorators'
import { relation } from '@nozbe/watermelondb/decorators'

export default class Price extends Model {
    static table = 'prices'
    static associations: {
        items: { type: 'belongs_to', key: 'item_id' },
        stores: { type: 'belongs_to', key: 'store_id' },
    }

    // @relation('items', 'item_id') item
    // @relation('stores', 'store_id') store
}