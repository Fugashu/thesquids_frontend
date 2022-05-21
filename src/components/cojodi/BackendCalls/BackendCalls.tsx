import axios from "axios";
import { backendEndpoint, clientId } from "../../../constants";
import { CojodiNetworkSwitcher } from "./CojodiNetworkSwitcher";
import rpcData from "./chainRpcData";
import {
  getConnectedSignerAddress,
  mumbaiNFTContract,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  mumbaiWethContract,
} from "../MetamaskConnection/MetamaskWallet";
import {
  mumbaiTokenContractAbi,
  mumbaiTokenContractAddress,
  mumbaiTournamentContractAddress,
} from "../ContractConfig";
import { BigNumber } from "ethers";
import {
  setModal,
  setOnPopUpModal,
  setPopUpModalText,
  setPopUpModalTitle,
} from "../../../store/appSlice";
import { useAppDispatch } from "../../../store/hooks";
import { store } from "../../../store/store";

const post = async (endpoint: string, message: any) => {
  return await axios
    .post(backendEndpoint + endpoint, message)
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        displayPopUpModal(EPopUpModal.Error, error.response.data.detail);
        console.log(error.response.data.detail);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        displayPopUpModal(EPopUpModal.Error, error.request);
        // The request was made but no response was received
        console.log(error.request);
      } else {
        displayPopUpModal(EPopUpModal.Error, error);

        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return;
    })
    .then((response) => {
      console.log(response);
      return response;
    });
};

const get = async (endpoint: string) => {
  return await axios
    .get(backendEndpoint + endpoint)
    .catch(function (error) {
      console.log(error);

      if (error.response) {
        displayPopUpModal(EPopUpModal.Error, error.response.data.detail);

        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        displayPopUpModal(EPopUpModal.Error, error.request);
      } else {
        displayPopUpModal(EPopUpModal.Error, error);

        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    })
    .then((response) => {
      console.log(response);
      return response;
    });
};

//done
export const voteHighscore = async (message: any) => {
  await post("/tournament/highscore_vote", message);
};

//done
export const createHighscore = async (message: any) => {
  try {
    let res = await post("/tournament/highscore", message);
    // @ts-ignore
    return res["data"]["id"];
  } catch (e) {
    return "";
  }
};

export const patchHighscore = async (highscoreId: string, formData: any) => {
  await axios({
    method: "post",
    url: backendEndpoint + "/tournament/highscore/" + highscoreId,
    data: formData,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  })
    .catch(function (error) {
      if (error.response) {
        displayPopUpModal(EPopUpModal.Error, error.response.data.detail);

        // Request made and server responded
        console.log(error.response.data.detail);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        displayPopUpModal(EPopUpModal.Error, error.request);
      } else {
        displayPopUpModal(EPopUpModal.Error, error);

        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    })
    .then((response) => {
      console.log(response);
      return response;
    });
  // await post("/tournament/highscore/" + highscoreId, file);
};

//done
export const voteGame = async (message: any) => {
  await post("/tournament/game/vote", message);
};
//done
export const createUser = async (message: any) => {
  await post("/user", message);
};

//done
export const requestSessionId = async (message: any) => {
  try {
    let res = await post("/tournament/game", message);

    // @ts-ignore
    return res["data"]["session_id"];
  } catch (e) {
    return "";
  }
};
//done
export const requestGameUrl = async (sessionId: number) => {
  try {
    let res = await get("/tournament/game/" + sessionId);
    // @ts-ignore
    console.log(res["data"]);
    // @ts-ignore
    return res["data"];
  } catch (e) {
    return "";
  }
};
//done
export const fetchTournamentStats = async () => {
  try {
    let res = await get("/tournament/stats");
    // @ts-ignore
    return res["data"];
  } catch (e) {
    return "";
  }
};

//done
export const fetchLeaderboard = async () => {
  try {
    let res = await get("/tournament/highscore");
    console.log(res);
    // @ts-ignore
    return res["data"];
  } catch (e) {
    return [];
  }
};
//done
export const fetchUser = async (userWalletAddr: string) => {
  try {
    let res = await get("/user/" + userWalletAddr);
    console.log(res);
    // @ts-ignore
    return res["data"];
  } catch (e) {
    return null;
  }
};

export function authorizeWithDiscord() {
  let response_type = "code";
  let client_id = clientId;
  let scope = "identify";
  let redirect =
    "https://discord.com/api/oauth2/authorize?" +
    "response_type=" +
    response_type +
    "&client_id=" +
    client_id +
    "&scope=" +
    scope;

  window.location.href = redirect;
}

export async function getImageUrlForTokenId(tokenId: number) {
  try {
    let res = await get("/nft/" + tokenId);
    console.log(res);
    // @ts-ignore
    return res["data"];
  } catch (e) {
    return null;
  }
}

export enum EPopUpModal {
  Error,
  Info,
  Waiting,
}
export function displayPopUpModal(type: EPopUpModal, text?: string) {
  let title;
  switch (type) {
    case EPopUpModal.Error:
      title = "Error";
      break;
    case EPopUpModal.Info:
      title = "Info";
      break;
    case EPopUpModal.Waiting:
      title = "Info";
      text = "Waiting for transaction to confirm.";
      break;
  }

  store.dispatch(setPopUpModalTitle(title));
  if (text !== undefined) store.dispatch(setPopUpModalText(text));
  store.dispatch(setModal(true));
  store.dispatch(setOnPopUpModal(true));
}

export async function fetchUserNFTs(address: string) {
  try {
    let res = await get("/user/" + address + "/nfts");
    console.log(res);
    // @ts-ignore
    return res["data"];
  } catch (e) {
    return null;
  }
}
