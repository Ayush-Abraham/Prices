import { Model } from '@nozbe/watermelondb';
// import { Associations } from '@nozbe/watermelondb/Model';

export default class Store extends Model {
    static table = 'stores'
    static associations: {
        prices: { type: 'has_many', foreignKey: 'store_id' },
    }
}