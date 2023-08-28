import '../ItemCard/ItemCard.css'

const ItemCard = ({item, onSelectCard}) => {
    return (
        <div className="card__element">
                <img src={item.link} className="card__image" onClick={() => onSelectCard(item)}/>

            <h2 className="card__name">{item.name}</h2>
            </div>);
}

export default ItemCard;