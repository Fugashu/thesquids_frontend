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

const post = async (endpoint: string, message: any) => {
  axios
    .post(backendEndpoint + endpoint, message)
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
    .then((response) => console.log(response));
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

export const createHighscore = async (message: any) => {
  await post("/tournament/highscore", message);
};

export const patchHighscore = async (highscoreId: string, message: any) => {
  await post("/tournament/highscore/" + highscoreId, message);
};

//done
export const voteGame = async (message: any) => {
  await post("/tournament/game/vote", message);
};
//done
export const createUser = async (message: any) => {
  await post("/user", message);
};

export const startGame = async (message: any) => {
  await post("/tournament/game", message);
};

export const fetchRemainingParticipants = async () => {
  try {
    let res = await get("/tournament/stats");
    // @ts-ignore
    return res["data"]["n_participants"];
  } catch (e) {
    return "";
  }
};

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
