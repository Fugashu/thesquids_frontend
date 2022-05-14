import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ILootBox {
  image: string;
  label: string;
  price: number;
  quality: number;
  contain: { icon: string; name: string; percent: number }[];
  quantity: number;
}

export enum HomeModalEnum {
  dna = "dna",
  lives = "lives",
}

const initialState = {
  burgerOpen: false,
  modal: false,
  homeModalType: HomeModalEnum.dna as HomeModalEnum,
  showChooseTheCoinModal: false,
  tournamentsWarningModal: false,
  tournamentsTOSModal: false,
  leaderboardModal: false,
  onErrorModal: false,
  nickname: "",
  gameplayModal: false,
  stakingNftErrorModal: false,
  openBoxModal: false,
  voteModal: false,
  testRecordingModal: false,
  timeLeftModal: false,
  tournamentsModal: false,
  lootBox: null as null | ILootBox,
  walletAddress: "...",
  discordUserName: "",
  gameplayUrl: "",
  dnaBuyAmount: "",
  dnaBalance: "",
  lifeBalance: "",
  highScoreId: "",
  claimablePrizeAmount: "",
  errorModalText: "",
};

type InitialStateType = typeof initialState;

export const appSlice = createSlice({
  name: "app",
  initialState: initialState as InitialStateType,
  reducers: {
    setBurgerOpen: (state, action: PayloadAction<boolean>) => {
      state.burgerOpen = action.payload;
    },
    setModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setHomeModalType: (state, action: PayloadAction<HomeModalEnum>) => {
      state.homeModalType = action.payload;
    },
    setShowChooseTheCoinModal: (state, action: PayloadAction<boolean>) => {
      state.showChooseTheCoinModal = action.payload;
    },
    setTournamentsWarningModal: (state, action: PayloadAction<boolean>) => {
      state.tournamentsWarningModal = action.payload;
    },
    setTOSModal: (state, action: PayloadAction<boolean>) => {
      state.tournamentsTOSModal = action.payload;
    },
    setLeaderboardModal: (state, action: PayloadAction<boolean>) => {
      state.leaderboardModal = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setGameplayModal: (state, action: PayloadAction<boolean>) => {
      state.gameplayModal = action.payload;
    },
    setStakingNftErrorModal: (state, action: PayloadAction<boolean>) => {
      state.stakingNftErrorModal = action.payload;
    },
    setVoteModal: (state, action: PayloadAction<boolean>) => {
      state.voteModal = action.payload;
    },
    setLootBox: (state, action: PayloadAction<ILootBox>) => {
      state.lootBox = action.payload;
    },
    setOpenBoxModal: (state, action: PayloadAction<boolean>) => {
      state.openBoxModal = action.payload;
    },
    setTestRecordingModal: (state, action: PayloadAction<boolean>) => {
      state.testRecordingModal = action.payload;
    },
    setTimeLeftModal: (state, action: PayloadAction<boolean>) => {
      state.timeLeftModal = action.payload;
    },
    setTournamentsModal: (state, action: PayloadAction<boolean>) => {
      state.tournamentsModal = action.payload;
    },
    setOnErrorModal: (state, action: PayloadAction<boolean>) => {
      state.onErrorModal = action.payload;
    },

    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setDiscordUsername: (state, action: PayloadAction<string>) => {
      state.discordUserName = action.payload;
    },

    setGameplayUrl: (state, action: PayloadAction<string>) => {
      state.gameplayUrl = action.payload;
    },
    setDnaBuyAmount: (state, action: PayloadAction<string>) => {
      state.dnaBuyAmount = action.payload;
    },
    setDNABalance: (state, action: PayloadAction<string>) => {
      state.dnaBalance = action.payload;
    },
    setLifeBalance: (state, action: PayloadAction<string>) => {
      state.lifeBalance = action.payload;
    },
    setHighscoreId: (state, action: PayloadAction<string>) => {
      state.highScoreId = action.payload;
    },
    setClaimablePrizeAmount: (state, action: PayloadAction<string>) => {
      state.claimablePrizeAmount = action.payload;
    },
    setErrorModalText: (state, action: PayloadAction<string>) => {
      state.errorModalText = action.payload;
    },
  },
});

export const {
  setBurgerOpen,
  setModal,
  setHomeModalType,
  setShowChooseTheCoinModal,
  setTournamentsWarningModal,
  setOnErrorModal,
  setTOSModal,
  setLeaderboardModal,
  setNickname,
  setGameplayModal,
  setStakingNftErrorModal,
  setVoteModal,
  setLootBox,
  setOpenBoxModal,
  setTestRecordingModal,
  setTimeLeftModal,
  setTournamentsModal,
  setErrorModalText,

  setWalletAddress,
  setDiscordUsername,
  setGameplayUrl,
  setDnaBuyAmount,
  setDNABalance,
  setLifeBalance,
  setHighscoreId,
  setClaimablePrizeAmount,
} = appSlice.actions;

export const selectBurgerOpen = (state: RootState) => state.app.burgerOpen;
export const selectModal = (state: RootState) => state.app.modal;
export const selectHomeModalType = (state: RootState) =>
  state.app.homeModalType;
export const selectShowChooseTheCoinModal = (state: RootState) =>
  state.app.showChooseTheCoinModal;
export const selectTournamentsWarningModal = (state: RootState) =>
  state.app.tournamentsWarningModal;
export const selectTournamentsTOSModal = (state: RootState) =>
  state.app.tournamentsTOSModal;
export const selectLeaderboardModal = (state: RootState) =>
  state.app.leaderboardModal;
export const selectNickname = (state: RootState) => state.app.nickname;
export const selectGameplayModal = (state: RootState) =>
  state.app.gameplayModal;
export const selectStakingNftErrorModal = (state: RootState) =>
  state.app.stakingNftErrorModal;
export const selectVoteModal = (state: RootState) => state.app.voteModal;
export const selectLootBox = (state: RootState) => state.app.lootBox;
export const selectOpenBoxModal = (state: RootState) => state.app.openBoxModal;
export const selectTestRecordingModal = (state: RootState) =>
  state.app.testRecordingModal;
export const selectTimeLeftModal = (state: RootState) =>
  state.app.timeLeftModal;
export const selectTournamentsModal = (state: RootState) =>
  state.app.tournamentsModal;
export const selectOnErrorModal = (state: RootState) => state.app.onErrorModal;
export const selectErrorModalText = (state: RootState) =>
  state.app.errorModalText;

export const walletAddress = (state: RootState) => state.app.walletAddress;
export const discordUserName = (state: RootState) => state.app.discordUserName;
export const gameplayUrl = (state: RootState) => state.app.gameplayUrl;
export const dnaBuyAmount = (state: RootState) => state.app.dnaBuyAmount;
export const dnaBalance = (state: RootState) => state.app.dnaBalance;
export const lifeBalance = (state: RootState) => state.app.lifeBalance;
export const claimPrizeAmount = (state: RootState) =>
  state.app.claimablePrizeAmount;
export const highScoreId = (state: RootState) => state.app.highScoreId;
export const appReducer = appSlice.reducer;
