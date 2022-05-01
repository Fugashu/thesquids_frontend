import {useRef} from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {setModal, setVoteModal} from "../../../../store/appSlice";
import {useOutsideClick} from "../../../../hooks/useOutsideClick";
import * as React from "react";
import style from "./VoteModal.module.scss"
import {CloseButton} from "../CloseButton/CloseButton";
import {VoteModalCard} from "./VoteModalCard/VoteModalCard";

import modal from "../../../../assets/png/modal/vote/desktop.png";

export interface IVoteModalCard {
    gameName: string
    rating: number
    votesCount: number
}

const cards: IVoteModalCard[] = [
    {
        gameName: "Name of the game 1",
        rating: 1,
        votesCount: 348,
    },
    {
        gameName: "Name of the game 2",
        rating: 1,
        votesCount: 349,
    },
    {
        gameName: "Name of the game 3",
        rating: 1,
        votesCount: 350,
    }
]


export const VoteModal = () => {
    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setVoteModal(false));
    }

    useOutsideClick(ref, onClose);

    return (
        <div className={style.voteModal}>
            <div className={style.content} ref={ref}>

                <CloseButton onClick={onClose} className={style.closeButton}/>

                <img className={style.back} src={modal} alt=""/>

                <p className={style.title}>Stage 1</p>

                <div className={style.cards}>
                    {
                        cards.map((card, index) => <VoteModalCard key={index} {...card}/>)
                    }
                </div>

            </div>
        </div>
    )
}