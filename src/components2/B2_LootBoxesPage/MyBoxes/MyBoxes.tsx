import style from "./MyBoxes.module.scss"
import * as React from "react";

const boxes = [
    {
        label: "Common",
        value: 10,
    },
    {
        label: "Rare",
        value: 5,
    },
    {
        label: "Legendary",
        value: 1,
    },
    {
        label: "Epic",
        value: 3,
    },
]


export const MyBoxes = () => {
    return (
        <div className={style.myBoxes}>
            <h3 className={style.title}>My  boxes</h3>
            <div className={style.boxes}>
                {
                    boxes.map(({label, value}, index) => (
                        <div className={style.box} key={index}>
                            <div className={style.top}>

                            </div>
                            <button>

                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}