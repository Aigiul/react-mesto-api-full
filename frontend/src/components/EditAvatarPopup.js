import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(
    () => {
      avatarRef.current.value = "";
    },
    [isOpen],
  );

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input"
        id="input-popup-link-avatar"
        placeholder="Ссылка на аватар"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__error-message input-popup-link-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
