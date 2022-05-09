import * as React from "react";
import style from "./InputCustom.module.scss";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { desktopBreakPoint } from "../../../../../constants";
import clsx from "clsx";
import mobile from "../../../../../assets/png/modal/choose the coins/inputMobile.png";
import desktopDefault from "../../../../../assets/png/modal/choose the coins/inputDesktopDefault.png";
import desktopHover from "../../../../../assets/png/modal/choose the coins/inputDesktopHover.png";
import desktopFocus from "../../../../../assets/png/modal/choose the coins/inputDesktopFocus.png";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  dnaBuyAmount,
  selectModal,
  setDnaBuyAmount,
} from "../../../../../store/appSlice";

export const InputCustom = () => {
  const dnaAmount = useAppSelector(dnaBuyAmount);
  const dispatch = useAppDispatch();

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const matchDesktop = useMediaQuery(`(min-width:${desktopBreakPoint}px)`);

  return (
    <div
      className={style.inputCustom}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={
          focus
            ? matchDesktop
              ? desktopFocus
              : mobile
            : hover
            ? matchDesktop
              ? desktopHover
              : mobile
            : matchDesktop
            ? desktopDefault
            : mobile
        }
        alt=""
        className={style.back}
      />

      <div className={style.inputContent}>
        <input
          type="text"
          className={style.input}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => dispatch(setDnaBuyAmount(e.target.value))}
        />
        <p
          className={clsx({
            [style.placeholder]: true,
            [style.placeholder_top]: focus || Boolean(dnaAmount),
          })}
        >
          Enter the number
        </p>
      </div>
    </div>
  );
};
