import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Store extends Model {
    static table = 'stores'
    static associations: {
        prices: { type: 'has_many', foreignKey: 'store_id' },
    }

    @text('store_name') item_name: any
}