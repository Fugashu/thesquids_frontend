import React, {useRef, useState} from 'react';
import style from "./app.module.scss"
import {Home} from "../B0_Home/Home";
import {Roadmap} from "../B1_Roadmap/Roadmap";
import {Faq} from "../B3_FAQ/Faq";
import {Team} from "../B4_Team/Team";
import {Footer} from "../A3_Footer/Footer";
import {Header} from "../A1_Header/Header";
import {BurgerMenu} from "../A2_BurgerMenu/BurgerMenu";
import clsx from "clsx";
import {HomeNew} from "../B0_HomeNew/HomeNew";
import sun from "../../assets/png/sun2.png";
import {throttle} from "./helper";
import backWithoutAir from "../../assets/png/team-back-whithout-air.png";
import backAir from "../../assets/png/team-back-air.png";
import {useMediaQuery} from "@mui/material";
import {Preloader} from "../A4_Preloader/Preloader";
import {SliderJS2} from "../B2_Slider/SliderJS2";
// import clouds from "../../assets/gif/clouds.gif";

export const App = () => {
    const matchesDesktop = useMediaQuery('(min-width:1160px)');

    const top0 = matchesDesktop ? 161 : 3;
    const left0 = matchesDesktop ? 86 : -36;

    const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const refApp = useRef<HTMLDivElement>(null);

    const [deltaY, setDeltaY] = useState(0);
    const [brightness, setBrightness] = useState(1);
    const [opacity, setOpacity] = useState(0.7);
    const [top, setTop] = useState(0);
    const [koef, setKoef] = useState(1);
    const [left, setLeft] = useState(left0)
    const sunHeight = 217;

    const [scrollTop, setScrollTop] = useState(0);
    const [dir, setDir] = useState(0);
    const [headerIsTransparent, setHeaderIsTransparent] = useState(true);

    const [showHomeNew, setShowHomeNew] = useState(false)

    const onScrollHandler = throttle(() => {
        if (ref && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const deltaY = rect.top;
            setDeltaY(deltaY);
            const fullScroll = rect.height - window.innerHeight;

            const left2 = 0.5 * window.innerWidth - (215 - (matchesDesktop ? 0 : 0.5 * 215));


            const sunHeightEnd = matchesDesktop ? 2 * sunHeight : sunHeight;
            const top2 = window.innerHeight - sunHeightEnd - (window.innerWidth / 2.4);
            const topCurrent = top0 + (top2 - top0) * (-deltaY) / fullScroll;
            setTop(topCurrent);

            setBrightness(1 + 4 * (-deltaY) / fullScroll);
            setKoef(1 + (-deltaY) / fullScroll);
            setLeft(left0 + ((-deltaY) * (left2 - left0) / fullScroll));
            setOpacity(1 + deltaY / fullScroll);
        }

        if (refApp && refApp.current) {
            if (refApp.current.scrollTop - scrollTop > 0) {
                setDir(1);
            }
            if (refApp.current.scrollTop - scrollTop < 0) {
                setDir(-1);
            }
            setScrollTop(refApp.current.scrollTop);
            if (refApp.current.scrollTop > 68) {
                setHeaderIsTransparent(false);
            } else {
                setHeaderIsTransparent(true);
            }
        }

    }, 100);


    return (
        <div className={clsx({
            [style.app]: true,
            [style.app_fixed]: burgerMenuIsOpen,
        })}
             onScroll={onScrollHandler}
             ref={refApp}
        >

            <Preloader/>

            <Header burgerMenuIsOpen={burgerMenuIsOpen}
                    onClickHandler={(open: boolean) => setBurgerMenuIsOpen(open)}
                    dir={dir}
                    headerIsTransparent={headerIsTransparent}
            />
            <BurgerMenu burgerMenuIsOpen={burgerMenuIsOpen}
                        onClickHandler={(open: boolean) => setBurgerMenuIsOpen(open)}
            />

            {
                showHomeNew
                    ? <HomeNew/>
                    : <Home onClickHandler={() => setShowHomeNew(true)}/>
            }

            <div className={style.animWrapper}   ref={ref}>
                <img src={sun} alt="" className={style.sun}
                     style={{
                         top: deltaY >= 0 ? top0 : top + (-deltaY),
                         filter: `brightness(${
                             deltaY >= 0 ? 1 : brightness
                         })`,
                         width: matchesDesktop ? 215 * koef : 215,
                         height: matchesDesktop ? 217 * koef : 217,
                         left: deltaY >= 0 ? left0 : left
                     }}
                />
                <img src={backWithoutAir} alt="" className={style.back}/>
                <img src={backAir} alt="" className={style.air}/>

                <div className={style.rainWrapper}
                     style={{
                         top: deltaY >= 0 ? 0 : -deltaY,
                         opacity: deltaY >= 0 ? 1 : opacity,
                     }}
                >

                </div>
                {/*<div className={style.rainWrapper2}>*/}
                {/*    <div className={style.mask}/>*/}
                {/*</div>*/}

                <div className={style.componentsWrapper}>
                    <Roadmap/>
                    <SliderJS2/>
                    <Faq/>
                    <Team/>
                    <Footer/>
                </div>

            </div>

        </div>
    );
}

