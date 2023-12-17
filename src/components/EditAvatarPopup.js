import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState } from "react";
 
function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const currentAvatar = useRef()

  useEffect(() => {
    currentAvatar.current.value = ''
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(currentAvatar.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      button="Сохранить"
      isOpen={isOpen}
      prop="popup__form_clear_field popup__form_validate_photo-update"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={currentAvatar}
        className="popup__input"
        id="update-img"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span
        className="popup__placeholder popup__placeholder_error_update"
        id="update-img-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup