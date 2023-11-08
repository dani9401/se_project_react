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
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        <button className="card__likeButton">Heart</button>
      </div>
    </div>
  );
};

export default ItemCard;
