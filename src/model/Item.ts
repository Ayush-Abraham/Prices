import { Model } from '@nozbe/watermelondb';
// import { Associations } from '@nozbe/watermelondb/Model';

export default class Item extends Model {
    static table = 'items';
    static associations: {
        prices: { type: 'has_many', foreignKey: 'items_id' },
    };
}