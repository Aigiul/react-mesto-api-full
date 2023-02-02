import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_hidden"
  }`;

  return (
    <li className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        className="card__image"
        src={card.link}
        onClick={() => {
          onCardClick(card);
        }}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-number-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
