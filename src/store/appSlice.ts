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
  popUpModal: false,
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
  popUpModalText: "",
  popUpModalTitle: "",
  oldHighscore: 0,
  tournamentTimer: 0,
  gameTimer: 0,
  voteTimer: 0,
  playersAdvancing: 0,
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
    setOnPopUpModal: (state, action: PayloadAction<boolean>) => {
      state.popUpModal = action.payload;
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
    setOldHighscore: (state, action: PayloadAction<number>) => {
      state.oldHighscore = action.payload;
    },
    setClaimablePrizeAmount: (state, action: PayloadAction<string>) => {
      state.claimablePrizeAmount = action.payload;
    },
    setPopUpModalText: (state, action: PayloadAction<string>) => {
      state.popUpModalText = action.payload;
    },
    setPopUpModalTitle: (state, action: PayloadAction<string>) => {
      state.popUpModalTitle = action.payload;
    },
    setTournamentTimer: (state, action: PayloadAction<number>) => {
      state.tournamentTimer = action.payload;
    },
    setGameTimer: (state, action: PayloadAction<number>) => {
      state.gameTimer = action.payload;
    },
    setVoteTimer: (state, action: PayloadAction<number>) => {
      state.voteTimer = action.payload;
    },
    setPlayersAdvancing: (state, action: PayloadAction<number>) => {
      state.voteTimer = action.payload;
    },
  },
});

export const {
  setBurgerOpen,
  setModal,
  setHomeModalType,
  setShowChooseTheCoinModal,
  setTournamentsWarningModal,
  setOnPopUpModal,
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
  setPopUpModalText,
  setPopUpModalTitle,
  setWalletAddress,
  setDiscordUsername,
  setGameplayUrl,
  setDnaBuyAmount,
  setDNABalance,
  setLifeBalance,
  setHighscoreId,
  setOldHighscore,
  setClaimablePrizeAmount,
  setTournamentTimer,
  setGameTimer,
  setVoteTimer,
  setPlayersAdvancing,
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
export const selectPopUpModal = (state: RootState) => state.app.popUpModal;
export const selectPopUpModalText = (state: RootState) =>
  state.app.popUpModalText;
export const selectPopUpModalTitle = (state: RootState) =>
  state.app.popUpModalTitle;

export const walletAddress = (state: RootState) => state.app.walletAddress;
export const discordUserName = (state: RootState) => state.app.discordUserName;
export const gameplayUrl = (state: RootState) => state.app.gameplayUrl;
export const dnaBuyAmount = (state: RootState) => state.app.dnaBuyAmount;
export const dnaBalance = (state: RootState) => state.app.dnaBalance;
export const lifeBalance = (state: RootState) => state.app.lifeBalance;
export const claimPrizeAmount = (state: RootState) =>
  state.app.claimablePrizeAmount;
export const highScoreId = (state: RootState) => state.app.highScoreId;
export const oldHighscore = (state: RootState) => state.app.oldHighscore;

export const tournamentTimer = (state: RootState) => state.app.tournamentTimer;
export const gameTimer = (state: RootState) => state.app.gameTimer;
export const voteTimer = (state: RootState) => state.app.voteTimer;
export const playersAdvancing = (state: RootState) =>
  state.app.playersAdvancing;
export const appReducer = appSlice.reducer;
