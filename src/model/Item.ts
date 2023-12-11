import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators'
import { writer } from '@nozbe/watermelondb/decorators'
// import { Associations } from '@nozbe/watermelondb/Model';

export default class Item extends Model {
    static table = 'items';
    static associations: {
        prices: { type: 'has_many', foreignKey: 'items_id' },
    };

    @text('item_name') item_name: any

    // @writer async addItem(item_name) {
    //     const newItem = await this.collections.get('items').create(item => {
    //         item.item_name = item_name
    //     })
    //     return newItem
    // }
    
    async addItem(item_name) {
        const newItem = await this.collections.get('items').create(item => {
            item.item_name = item_name
        })
        return newItem
    }



}