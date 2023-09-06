import "../ItemCard/ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card__element">
      <img
        src={item.imageUrl}
        className="card__image"
        onClick={() => onSelectCard(item)}
        alt="card-image"
      />

      <h2 className="card__name">{item.name}</h2>
    </div>
  );
};

export default ItemCard;
