import style from "./ErrorPage.module.scss"
import btn from "../../assets/png/buttons/go back/button.png";
import {useNavigate} from "react-router-dom";
import tv from "../../assets/png/pages/error page/tv.png";

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className={style.errorPage}>
            <div className={style.content}>
                <img src={tv} alt="" className={style.tv}/>

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