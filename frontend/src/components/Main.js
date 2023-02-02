import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
        <div className="profile__info">
          <div className="profile__user-name">
            <h1 className="profile__title">{name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery" aria-label="галерея">
        <ul className="cards">
          {cards.map((data) => {
            return (
              <Card
                card={data}
                id={data._id}
                key={data._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
