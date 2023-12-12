import { withObservables } from '@nozbe/watermelondb/react'
import EnhancedItem from './EnhancedItem';


function ItemsBox(items: any): React.JSX.Element {
    return (
        <div>
            {items.map((item: { id: React.Key | null | undefined; }) =>
                <EnhancedItem key={item.id} item={item} />
            )}

        </div>
    );
}

const enhance = withObservables(['item'], ({item}) => ({
    item
}))

const EnhancedItemsBox = enhance(ItemsBox)
export default EnhancedItemsBox
