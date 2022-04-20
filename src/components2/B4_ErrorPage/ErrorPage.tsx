import style from "./ErrorPage.module.scss"
import {svgIcons} from "../../assets/svg/svgIcons";
import btn from "../../assets/png/buttons/go back/button.png";
import {useNavigate} from "react-router-dom";

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className={style.errorPage}>
            <div className={style.content}>
                <div>
                    {svgIcons.monitor}
                </div>

                <h2>Error</h2>
                <p className={style.description}>Only PC users have the opportunity to take part in the tournament</p>

                <button className={style.btn}
                        onClick={() => navigate(-1)}
                >
                    <img src={btn} alt=""/>
                    <p className={style.text}>go back</p>
                </button>
            </div>

        </div>
    )
}