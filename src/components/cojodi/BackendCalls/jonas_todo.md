# Jonas TODO

## General

- jeder api call gibt einen 400er zurueck wenn er failed, das musst du catchen, und printen am besten
    - wenn du einen fehler hast hat die response res["detail"] da ist der error
- alle funktionen muessen signiert werden die user spezifische interaktion erfordern

beispiel signieren

```js
msg = {
    "b": "b",
    "a": "a",
}

let signer = await ethers.getSigner();
signpayload = JSON.stringify(msg, Object.keys(msg).sort());

let sig = await signer.signMessage(signpayload);

msg["signature"] = sig;

// send msg
```

## Contract Only

- stake(tokenIds) => if tokens not staked => contract.getStake
    - braucht nft allowance

- unstake(tokenIds) => if has stake and every token to unstake present in stake => contract.stakeIndexOf(tokenId) (if -1 token not there)

- register() => (requires allowance for DNA) => only possible if contract.Phase == 1 (Registration)
    - wuerde auch die balance vom user checken ob er genug hat, dna.balanceOf(addr)
    - auch checken ob er schon registriert ist (contract.registeredUsers(addr) => bool)

- buyLives(amount_)
    - checken ob preis gesetzt ist (contract.lifeFee())
    - braucht DNA allowance (vll fuer allowance n eigenes ding was die setzen koennen und wv)

- claim(merkleProof, amount)
    - backend call fuer die liste fuer den tree
    - generell den button nur rendern wenn die Phase CLAIM ist aka. 2
    - tree erzeugen
        - leafs:
            // du bekommst von mir: [[addr, amount],...]
            leafNodes = [ethers.utils.solidityKeccak256(["address", "uint256"], [user.address, amount])];
            claimMerkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });


## Backend

- /user/{addr} gibt dir den user

- POST /tournament/game start_game startet ein game
    - du bekommst eine uuid (session_id) zurueck
    - mit der uuid callst du /tournament/game/{session_id} (der call hier ist 10sekunden valid, vor dem vorheringen)
    - also nach 10 sekunden kannst du das game nicht mehr laden und hast verloren

- GET /tournament/highscore gibt dir alle scores mit der video url


