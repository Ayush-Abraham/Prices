import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        // We'll add tableSchemas here later
        tableSchema({
            name: 'items',
            columns: [
                { name: 'item_name', type: 'string' },
            ]
        }),
        tableSchema({
            name: 'stores',
            columns: [
                { name: 'store_name', type: 'string' },
            ]
        }),
        tableSchema({
            name: 'prices',
            columns: [
                { name: 'item_id', type: 'string' },
                { name: 'store_id', type: 'string' },
                { name: 'cost', type: 'number' },
                { name: 'noted_at', type: 'number' },
            ]
        }),
    ]
})