import style from "./MyBoxes.module.scss"
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {boxes} from "../constants";
import {useAppDispatch} from "../../../store/hooks";
import {setLootBox} from "../../../store/appSlice";
import {useNavigate} from "react-router-dom";
import {ButtonCustom} from "../../common/ButtonCustom/ButtonCustom";

import imgMobileDefault from "../../../assets/png/buttons/loot boxes page/open/mobileDefault.png";
import imgMobileClick from "../../../assets/png/buttons/loot boxes page/open/mobileClick.png";
import imgDesktopDefault from "../../../assets/png/buttons/loot boxes page/open/desktopDefault.png";
import imgDesktopHover from "../../../assets/png/buttons/loot boxes page/open/desktopHover.png";
import imgDesktopClick from "../../../assets/png/buttons/loot boxes page/open/desktopClick.png";

export const MyBoxes = () => {
    const matchDesktop = useMediaQuery('(min-width:1440px)');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className={style.myBoxes}>

            <h3 className={style.title}>My boxes</h3>

            <div className={style.boxes}>
                {
                    boxes.map(({label, quality}, index) => (
                        <div className={style.box} key={index}>
                            <div className={style.top}>
                                <p className={style.label}>{label}</p>
                                <p className={style.value}>{quality}</p>
                            </div>

                            <ButtonCustom className={style.openBtn}
                                          onClick={() => {
                                              navigate('/app2/box')
                                              dispatch(setLootBox(boxes[index]));
                                          }}
                                          widthMobile={288}
                                          heightMobile={40}
                                          widthDesktop={260}
                                          heightDesktop={40}
                                          imgMobileDefault={imgMobileDefault}
                                          imgMobileClick={imgMobileClick}
                                          imgDesktopDefault={imgDesktopDefault}
                                          imgDesktopHover={imgDesktopHover}
                                          imgDesktopClick={imgDesktopClick}

                            >
                                <p>open</p>
                            </ButtonCustom>

                        </div>
                    ))
                }
            </div>

            <div className={style.cards}>

            </div>


        </div>
    )
}