import { ICard } from './Team';
import React, { FC, useState } from 'react';

import style from './card.module.scss';

import { ButtonLink } from '../common/ButtonLink/ButtomLink';

export const Card: FC<ICard> = ({ photos, name, job, description, button }) => {
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <div className={style.card} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
      <div className={style.person} style={{ backgroundImage: `url(${isHovered ? photos.hovered : photos.default})` }} />
      <p className={style.name}>{name}</p>
      <p className={style.job}>{job}</p>
      <p className={style.text}>{description}</p>
      <ButtonLink
        imgDefault={button.icons.default}
        imgHover={button.icons.hovered}
        imgClick={button.icons.clicked}
        href={button.href}
        className={style.link}
      />
    </div>
  );
};
