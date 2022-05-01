import * as React from "react";
import style from "./LootBoxesPage.module.scss";
import {MyBoxes} from "./MyBoxes/MyBoxes";
import {Cards} from "./Cards/Cards";

export const LootBoxesPage = () => {
    return (
        <div className={style.lootBoxesPage}>
            <div className={style.inner}>
                <h2 className={style.title}>Loot Boxes</h2>
                <MyBoxes/>
                <Cards/>
            </div>
        </div>
    )
}