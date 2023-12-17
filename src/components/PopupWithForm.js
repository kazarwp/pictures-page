function PopupWithForm({name, title, button, children, isOpen, prop, onClose, onSubmit}) {
  return(
    <section className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form
            className={`popup__form ${prop}`}
            name={name}
            onSubmit={onSubmit}
          >
            {children}
            <button
              className="popup__button popup__button_type_disabled"
              type="submit"
            >
              {button}
            </button>
          </form>
          <button className="popup__close" type="button" onClick={() => onClose()}></button>
        </div>
      </section>
  )
}

export default PopupWithForm