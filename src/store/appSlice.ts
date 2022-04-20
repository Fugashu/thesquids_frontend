import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export enum HomeModalEnum {
    dna = "dna",
    lives = "lives"
}

const initialState = {
    burgerOpen: false,
    modal: false,
    homeModalType: HomeModalEnum.dna as HomeModalEnum,
    showChooseTheCoinModal: false,
    tournamentsWarningModal: false,
    leaderboardModal: false,
    nickname: "",
    gameplayModal: false,
    stakingNftErrorModal: false,
    voteModal: false,
}

type InitialStateType = typeof initialState

export const appSlice = createSlice({
    name: "app",
    initialState: initialState as InitialStateType,
    reducers: {
        setBurgerOpen: (state, action: PayloadAction<boolean>) => {
            state.burgerOpen = action.payload
        },
        setModal: (state, action: PayloadAction<boolean>) => {
            state.modal = action.payload
        },
        setHomeModalType: (state, action: PayloadAction<HomeModalEnum>) => {
            state.homeModalType = action.payload
        },
        setShowChooseTheCoinModal: (state, action: PayloadAction<boolean>) => {
            state.showChooseTheCoinModal = action.payload
        },
        setTournamentsWarningModal: (state, action: PayloadAction<boolean>) => {
            state.tournamentsWarningModal = action.payload
        },
        setLeaderboardModal: (state, action: PayloadAction<boolean>) => {
            state.leaderboardModal = action.payload
        },
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload
        },
        setGameplayModal: (state, action: PayloadAction<boolean>) => {
            state.gameplayModal = action.payload
        },
        setStakingNftErrorModal: (state, action: PayloadAction<boolean>) => {
            state.stakingNftErrorModal = action.payload
        },
        setVoteModal: (state, action: PayloadAction<boolean>) => {
            state.voteModal = action.payload
        },
    }
})

export const {
    setBurgerOpen,
    setModal,
    setHomeModalType,
    setShowChooseTheCoinModal,
    setTournamentsWarningModal,
    setLeaderboardModal,
    setNickname,
    setGameplayModal,
    setStakingNftErrorModal,
    setVoteModal,

} = appSlice.actions

export const selectBurgerOpen = (state: RootState) => state.app.burgerOpen;
export const selectModal = (state: RootState) => state.app.modal;
export const selectHomeModalType = (state: RootState) => state.app.homeModalType;
export const selectShowChooseTheCoinModal = (state: RootState) => state.app.showChooseTheCoinModal;
export const selectTournamentsWarningModal = (state: RootState) => state.app.tournamentsWarningModal;
export const selectLeaderboardModal = (state: RootState) => state.app.leaderboardModal;
export const selectNickname = (state: RootState) => state.app.nickname;
export const selectGameplayModal = (state: RootState) => state.app.gameplayModal;
export const selectStakingNftErrorModal = (state: RootState) => state.app.stakingNftErrorModal;
export const selectVoteModal = (state: RootState) => state.app.voteModal;

export const appReducer = appSlice.reducer