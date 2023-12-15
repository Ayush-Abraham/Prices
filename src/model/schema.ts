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
                { name: 'item_id', type: 'string', isOptional: false },
                { name: 'store_id', type: 'string', isOptional: false  },
                { name: 'cost', type: 'number', isOptional: false  },
                { name: 'noted_at', type: 'string', isOptional: false  },
            ]
        }),
    ]
})