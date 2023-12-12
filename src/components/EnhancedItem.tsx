import { withObservables } from '@nozbe/watermelondb/react'


function SingleItem(item: any): React.JSX.Element {
    return (
        <div>
            <p>{item.item_name}</p>
        </div>
    );
}

const enhance = withObservables(['item'], ({ item }) => ({
    item
}))

const EnhancedItem = enhance(SingleItem)

export default EnhancedItem;
