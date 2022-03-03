import React, { useState } from "react";
import style from "./slider.module.scss"
import slide0 from "../../assets/gif/ryu.gif";
import slide1 from "../../assets/gif/sherif.gif";
import slide2 from "../../assets/gif/megaman.gif";
import slide3 from "../../assets/gif/geisha.gif";
import slide4 from "../../assets/gif/female astraunaut.gif";
import slide5 from "../../assets/gif/female adventurer.gif";
import slide6 from "../../assets/gif/tracksuit.gif";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, {Controller} from 'swiper';
import clsx from "clsx";

const slides = [
    slide0,
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
];
SwiperCore.use([Controller]);
export const SliderJS2 = () => {
    const [swiperTop, setSwiperTop] = useState(null);
    const [swiperBottom, setSwiperBottom] = useState(null);

    return (
        <section className={style.slider}>
            {/*<div className={style.buttons}>*/}
            {/*    <IconButton disableRipple={true}*/}
            {/*                disableTouchRipple={true}*/}
            {/*                disableFocusRipple={true}*/}
            {/*                onClick={() => {*/}
            {/*                    swiperTop?.slidePrev();*/}
            {/*                    swiperBottom?.slidePrev();*/}
            {/*                }}*/}
            {/*                style={{marginRight: "32px"}}*/}
            {/*    >*/}
            {/*        <ArrowBackIosIcon fontSize='large'/>*/}
            {/*    </IconButton>*/}
            {/*    <IconButton disableRipple={true}*/}
            {/*                disableTouchRipple={true}*/}
            {/*                disableFocusRipple={true}*/}
            {/*                onClick={() => {*/}
            {/*                    swiperTop?.slideNext();*/}
            {/*                    swiperBottom?.slideNext();*/}
            {/*                }}*/}
            {/*    >*/}
            {/*        <ArrowForwardIosIcon fontSize='large'/>*/}
            {/*    </IconButton>*/}
            {/*</div>*/}

            <Swiper className={clsx(style.swiper, style.swiper_top)}
                    slidesPerView="auto"
                    slidesPerGroup={1}
                    dir="rtl"
                    loop={true}
                    onSwiper={setSwiperTop}
                    modules={[Controller]}
                    controller={{control: swiperBottom }}
                    breakpoints={{
                        0: {
                            spaceBetween: 16,
                        },
                        1440: {
                            spaceBetween: 32,
                        },
                    }}
            >
                {
                    slides.map((slide, index) => (
                        <SwiperSlide key={index} className={style.slide}>
                            <img src={slide} alt=""/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <Swiper className={clsx(style.swiper, style.swiper_bottom)}
                    slidesPerView="auto"
                    slidesPerGroup={1}
                    loop={true}
                    onSwiper={setSwiperBottom}
                    breakpoints={{
                        0: {
                            spaceBetween: 16,
                        },
                        1440: {
                            spaceBetween: 32,
                        },
                    }}
                    modules={[Controller]}
                    controller={{ control: swiperTop }}
            >
                {
                    slides.map((slide, index) => (
                        <SwiperSlide key={index} className={style.slide}>
                            <img src={slide} alt=""/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/*<div className={style.buttons}>*/}
            {/*    <IconButton disableRipple={true}*/}
            {/*                disableTouchRipple={true}*/}
            {/*                disableFocusRipple={true}*/}
            {/*                onClick={() => {*/}
            {/*                    swiperBottom?.slidePrev();*/}
            {/*                    swiperTop?.slidePrev();*/}
            {/*                }}*/}
            {/*                style={{marginRight: "32px"}}*/}
            {/*    >*/}
            {/*        <ArrowBackIosIcon fontSize='large'/>*/}
            {/*    </IconButton>*/}
            {/*    <IconButton disableRipple={true}*/}
            {/*                disableTouchRipple={true}*/}
            {/*                disableFocusRipple={true}*/}
            {/*                onClick={() => {*/}
            {/*                    swiperBottom?.slideNext();*/}
            {/*                    swiperTop?.slideNext();*/}
            {/*                }}*/}
            {/*    >*/}
            {/*        <ArrowForwardIosIcon fontSize='large'/>*/}
            {/*    </IconButton>*/}
            {/*</div>*/}
        </section>
    )
}