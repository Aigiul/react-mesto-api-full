import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        type="text"
        className="popup__input"
        id="input-popup-title"
        value={name || ""}
        placeholder="Имя"
        name="name"
        minLength={2}
        maxLength={40}
        required
        onChange={onChangeName}
      />
      <span className="popup__error-message input-popup-title-error" />
      <input
        type="text"
        className="popup__input"
        id="input-popup-subtitle"
        value={description || ""}
        placeholder="O себе"
        name="about"
        minLength={2}
        maxLength={200}
        required
        onChange={onChangeDescription}
      />
      <span className="popup__error-message input-popup-subtitle-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
