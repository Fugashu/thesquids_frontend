import React from 'react';
import style from './team.module.scss';

import { Card } from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';

import theoidle from '../../assets/png/Theo-idle.png';
import theohover from '../../assets/png/Theo-Hover.png';

import dimiidle from '../../assets/png/Dimi-idle.png';
import dimihover from '../../assets/png/Dimi-Hover.png';

import Jonasidle from '../../assets/png/Jonas-idle.png';
import Jonashover from '../../assets/png/Jonas-Hover.png';

import Zozimoidle from '../../assets/png/Joso-Idle.png';
import Zozimohover from '../../assets/png/Joso-Hover.png';

import Anatolyidle from '../../assets/png/Anatoly-Idle.png';
import Anatolyhover from '../../assets/png/Anatoly-Hover.png';

import Modidle from '../../assets/png/Mod-Idle.png';
import Modhover from '../../assets/png/Mod-Hover.png';

import githubD from '../../assets/png/buttons/githubD.png';
import githubH from '../../assets/png/buttons/githubH.png';
import githubC from '../../assets/png/buttons/githubC.png';

import dribbbleD from '../../assets/png/buttons/dribbbleD.png';
import dribbbleH from '../../assets/png/buttons/dribbbleH.png';
import dribbbleC from '../../assets/png/buttons/dribbbleC.png';

import linktreeD from '../../assets/png/buttons/linktreeD.png';
import linktreeH from '../../assets/png/buttons/linktreeH.png';
import linktreeC from '../../assets/png/buttons/linktreeC.png';

import twitterD from '../../assets/png/buttons/twitterBtnIdle.png';
import twitterH from '../../assets/png/buttons/twitterBtnHover.png';
import twitterC from '../../assets/png/buttons/twitterBtnIPressed.png';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

export interface ICard {
  photos: {
    default: string;
    hovered: string;
    
  };
  name: string;
  job: string;
  description: string;
  button: {
    href: string;
    icons: {
      default: string;
      hovered: string;
      clicked: string;
    };
  };
}

const persons: ICard[] = [
  {
    photos: {
      default: theoidle,
      hovered: theohover,
      
    },
    name: 'Theo “Gundy” Escriva',
    job: 'Project Lead',
    description:
      'After joining the crypto scene in 2016, French entrepreneur and digital business owner Theo has built and directed numerous projects',
    button: {
      href: 'https://twitter.com/Gundy__',
      icons: {
        default: twitterD,
        hovered: twitterH,
        clicked: twitterC,
      },
    },
  },
  {
    photos: {
      default: Zozimoidle,
      hovered: Zozimohover,
      
    },
    name: 'Zozimo Neto ',
    job: 'Artist',
    description:
      'For the last 16 years, the retro media-inspired Brazilian artist and game designer Zózimo has worked for companies across the globe, including Gameloft.',
    button: {
      href: 'https://linktr.ee/zozimo_nt',
      icons: {
        default: linktreeD,
        hovered: linktreeH,
        clicked: linktreeC,
      },
    },
  },
  {
    photos: {
      default: Jonasidle,
      hovered: Jonashover,
      
    },
    name: 'Jonas “Fugashu” Friesslich',
    job: 'Software engineer',
    description:
      'The German blockchain enthusiast Jonas is a medical software engineer and a university tutor of C++.',
    button: {
      href: 'https://github.com/Fugashu',
      icons: {
        default: githubD,
        hovered: githubH,
        clicked: githubC,
      },
    },
  },
  {
    photos: {
      default: dimiidle,
      hovered: dimihover,
      
    },
    name: 'Dmitrij “Dimfred” Vinokour',
    job: 'Blockchain Developer',
    description:
      'Three years ago, Dimi began working on various blockchain projects, gathering experience in the lead up to this project.',
    button: {
      href: 'https://github.com/dimfred',
      icons: {
        default: githubD,
        hovered: githubH,
        clicked: githubC,
      },
    },
  },
  {
    photos: {
      default: Anatolyidle,
      hovered: Anatolyhover,
     
    },
    name: 'Anatoliy Demyanchuk',
    job: 'UI/UX designer',
    description:
      'Anatoliy is a Ukrainian art director working exclusively in crypto for projects like Jigen.app for the past 2 years, gaining experience culminating to this moment.',
    button: {
      href: 'https://dribbble.com/Demianchuk',
      icons: {
        default: dribbbleD,
        hovered: dribbbleH,
        clicked: dribbbleC,
      },
    },
  },
  {
    photos: {
      default: Modidle,
      hovered: Modhover,
      
    },
    name: 'The Squids Moderators',
    job: 'Community moderators',
    description:
      'Moderators will be chosen during the first phase of the project. Consisting of early enthusiasts desiring to help the project reach its full potential.',
    button: {
      href: 'https://twitter.com/TheSquids_NFT',
      icons: {
        default: twitterD,
        hovered: twitterH,
        clicked: twitterC,
      },
    },
  },
];

export const Team = () => {
  return (
    <section className={style.team}>
      <h2 className={style.title} id='Team'>
        Meet our team
      </h2>

      <Swiper
        className={style.slider}
        spaceBetween={8}
        slidesPerView='auto'
        slidesPerGroup={1}
      >
        {persons.map((person, index) => (
          <SwiperSlide key={index} className={style.slide}>
            <Card {...person} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={style.cards}>
        {persons.map((person, index) => (
          <Card key={index} {...person} />
        ))}
      </div>
    </section>
  );
};
