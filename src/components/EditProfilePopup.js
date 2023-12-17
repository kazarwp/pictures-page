import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
          title="Редактировать профиль"
          name="edit"
          button="Сохранить"
          isOpen={isOpen}
          prop="popup__form_validate_edit"
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            className="popup__input popup__input_user_name"
            id="name-input"
            type="text"
            value={name || ''}
            placeholder="Имя"
            name="name"
            minLength="2"
            maxLength="40"
            required
            onChange={handleChangeName}
          />
          <span
            className="popup__placeholder popup__placeholder_error_name"
            id="name-input-error"
          ></span>
          <input
            className="popup__input popup__input_user_jobs"
            id="job-input"
            type="text"
            value={description || ''}
            placeholder="О себе"
            name="about"
            minLength="2"
            maxLength="200"
            required
            onChange={handleChangeDescription}
          />
          <span
            className="popup__placeholder popup__placeholder_error_job"
            id="job-input-error"
          ></span>
        </PopupWithForm>
  )
}

export default EditProfilePopup