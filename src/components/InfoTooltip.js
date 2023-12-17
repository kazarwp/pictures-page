import successful__icon from "../images/Union1.svg"
import fail from "../images/UnionFail.png"

function InfoTooltip({isSucces, onClose, isOpen}) {
  return(
    <section className={isOpen ? "popup popup_opened" : "popup"}>
      <div className="popup__container">
        <img className="popup__tooltip" src={isSucces ? successful__icon : fail}/>
        <p className="popup__info-text">{isSucces ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."} </p>
        <button className="popup__close" onClick={() => onClose()} type="button"></button>
      </div>
    </section>
  )
}

export default InfoTooltip

