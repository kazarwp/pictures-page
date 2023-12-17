import { useEffect, useState, useContext } from "react";
import Card from "./Card";
import api from "../untils/Api";
import CurrentUserContext from "../context/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onClickCard, onCardLike, cards, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Аватарка"
        />
        <button
          className="profile__edit-avatar"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__info-man">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button "
              onClick={() => onEditProfile()}
            ></button>
          </div>
          <p className="profile__jobs">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => onAddPlace()}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              cardName={card.name}
              cardImg={card.link}
              cardLike={card.likes.length}
              onCardClick={onClickCard}
              onCardLike={onCardLike}
              onCardDelete = {onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
