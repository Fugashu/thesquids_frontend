import * as React from "react";
import style from "./VoteModalCard.module.scss";
import { FC, useState } from "react";
import { svgIcons } from "../../../../../assets/svg/svgIcons";
import { Rating } from "@mui/material";
import { IVoteModalCard } from "../VoteModal";
import btn from "../../../../../assets/png/buttons/vote modal card/desktop.png";

export const VoteModalCard: FC<IVoteModalCard> = ({
  gameName,
  rating,
  votesCount,
  icon,
}) => {
  const [value, setValue] = useState<number | null>(rating);

  const [hover, setHover] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const onChangeHandler = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    setValue(value);
  };

  return (
    <div
      className={style.voteModalCard}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      <div className={style.back}>
        {mouseDown
          ? svgIcons.voteModalCardClick
          : hover
          ? svgIcons.voteModalCardHover
          : svgIcons.voteModalCardDefault}
      </div>

      <div className={style.content}>
        <Rating
          max={3}
          value={value}
          onChange={onChangeHandler}
          emptyIcon={svgIcons.ratingIconEmpty}
          icon={svgIcons.ratingIconFull}
          className={style.rating}
        />

        <div className={style.icon}>
          <img src={icon} />
        </div>

        {/* <p className={style.gameName}>{gameName}</p> */}

        <button className={style.voteButton}>
          <img src={btn} alt="" />
          <p>vote</p>
        </button>

        <p className={style.votesCount}>{`${votesCount} votes`}</p>
      </div>
    </div>
  );
};
