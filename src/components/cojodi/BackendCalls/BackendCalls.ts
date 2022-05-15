import axios from "axios";
import { backendEndpoint } from "../../../constants";
import { CojodiNetworkSwitcher } from "./CojodiNetworkSwitcher";
import rpcData from "./chainRpcData";
import {
  getConnectedSignerAddress,
  mumbaiTokenContract,
  mumbaiTournamentContract,
  mumbaiWethContract,
} from "../MetamaskConnection/MetamaskWallet";
import {
  mumbaiTokenContractAbi,
  mumbaiTokenContractAddress,
  mumbaiTournamentContractAddress,
} from "../ContractConfig";
import { BigNumber, ethers } from "ethers";
import {
  setErrorModalText,
  setModal,
  setOnErrorModal,
} from "../../../store/appSlice";

const post = async (endpoint: string, message: any) => {
  return await axios
    .post(backendEndpoint + endpoint, message)
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        alert(error.response.data.detail);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
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
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
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
  await post("/tournament/highscore/vote", message);
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
    method: "patch",
    url: backendEndpoint + "/tournament/highscore/" + highscoreId,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        alert(error.response.data.detail);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
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
export const fetchRemainingParticipants = async () => {
  try {
    let res = await get("/tournament/stats");
    // @ts-ignore
    return res["data"]["n_participants"];
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

export const buyDNA = async (tokenAmount: number) => {
  let balance: BigNumber = await mumbaiWethContract.balanceOf(
    await getConnectedSignerAddress()
  );

  let price: BigNumber = await mumbaiTokenContract.price();
  let ethAmount = price.mul(tokenAmount);

  if (balance.lt(ethAmount)) {
    alert("You do not have enough WETH for this transaction.");
    return;
  }
  let allowanceValue = await mumbaiWethContract.allowance(
    await getConnectedSignerAddress(),
    mumbaiTokenContractAddress
  );

  if (allowanceValue.lt(ethAmount)) {
    console.log(`setting allowance for ${ethAmount}`);
    let tx = await mumbaiWethContract.approve(
      mumbaiTokenContractAddress,
      ethAmount
    );
    await tx.wait();
  }

  await mumbaiTokenContract.buy(ethAmount);
};

export const buyLives = async (numberOfLives: number) => {
  let balance: BigNumber = await mumbaiTokenContract.balanceOf(
    await getConnectedSignerAddress()
  );
  let lifePrice: BigNumber = await mumbaiTournamentContract.lifeFee();

  console.log(lifePrice);

  let dnaAmount = lifePrice.mul(numberOfLives);

  if (balance.lt(dnaAmount)) {
    alert("You do not have enough WETH for this transaction.");
    return;
  }
  let allowanceValue = await mumbaiTokenContract.allowance(
    await getConnectedSignerAddress(),
    mumbaiTournamentContractAddress
  );

  if (allowanceValue.lt(dnaAmount)) {
    console.log(`setting allowance for dnaAmount: ${dnaAmount}`);
    let tx = await mumbaiTokenContract.approve(
      mumbaiTournamentContractAddress,
      dnaAmount
    );
    await tx.wait();
  }

  await mumbaiTournamentContract.buyLives(numberOfLives);
};

export function authorizeWithDiscord() {
  let response_type = "code";
  let client_id = process.env.REACT_APP_CLIENT_ID;
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
  {
    /*  let imageSrc = "undefined";
  imageSrc = await mumbaiNFTContract.tokenURI(tokenId);
   try {
    console.log("test" + imageSrc);
    imageSrc = imageSrc.split("ipfs://");
    imageSrc = "https://infura-ipfs.io/ipfs/" + imageSrc[1];
    console.log(imageSrc);

    imageSrc = await axios.get(imageSrc).then((response) => {
      let imgLink = response.data.image;
      imgLink = imgLink.split("ipfs://");
      imgLink = "https://infura-ipfs.io/ipfs/" + imgLink[1];
      console.log(imgLink);
      return imgLink;
    });
  } catch (e) {
    console.log("Error while fetching token URI");
  }*/
  }
  return "";
}
