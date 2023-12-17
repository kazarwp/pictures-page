import CurrentUserContext from "../context/CurrentUserContext";
import { useContext } from "react";

function Card({ cardName, cardImg, cardLike, onCardClick, card, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;


  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card)
  }

  function handleDelete() {
    onCardDelete(card)
  }
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `article__button-like ${isLiked && 'article__button-like_active'}` 
  );;

  return (
    <div className="article">
      <img className="article__card-img" src={cardImg} onClick={() => handleClick()} alt={cardName}/>
      <h2 className="article__title">{cardName}</h2>
      <button className={cardLikeButtonClassName} onClick={() => handleLike()} type="button"></button>
      {isOwn && <button className='article__trash' onClick={() => handleDelete()}/>}
      <p className='article__like'>{cardLike}</p>
    </div>
  );
}

export default Card;
