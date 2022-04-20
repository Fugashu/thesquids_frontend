import {FC} from "react";
import style from "./GameplayModalButton.module.scss";
import legitMobile from "../../../../../assets/png/buttons/legit/mobile.png";
import legitDesktop from "../../../../../assets/png/buttons/legit/desktop.png";
import cheatingMobile from "../../../../../assets/png/buttons/cheating/mobile.png";
import cheatingDesktop from "../../../../../assets/png/buttons/cheating/desktop.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import {ReactTextareaAutocomplete} from "stream-chat-react/dist/components/AutoCompleteTextarea/Textarea";

interface IGameplayModalButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    first?: boolean
    className?: string
}

export const GameplayModalButton: FC<IGameplayModalButton> = ({
                                                                  first = true,
                                                                  className
                                                              }) => {
    const matchDesktop = useMediaQuery('(min-width:1440px)');
    const src = first ? (matchDesktop ? legitDesktop : legitMobile) : (matchDesktop ? cheatingDesktop : cheatingMobile)

    return (
        <button className={clsx(style.gameplayModalButton, className && className)}>
            <img src={src}
                 alt=""
                 className={style.back}
            />
            <p style={{color: first ? "#548C24" : "#9A1C1C"}}
            >
                {first ? "Legit" : "CHeating"}
            </p>
        </button>
    )
}