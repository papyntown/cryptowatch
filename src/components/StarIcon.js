import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const StarIcon = ({ coinId }) => {
    const [like, setLike] = useState(false);
    const idChecker = (id) => {
        let favList = null;
        if (window.localStorage.coinList) {
            favList = window.localStorage.coinList.split(",");
        }
        // si favlist est toujour null il ne rentre pas dans cette condition
        if (favList) {
            if (favList.includes(id)) {
                // exclu de windows local storage l'id selectionner
                window.localStorage.coinList = favList.filter(
                    (coin) => coin !== id
                );
                setLike(false);
            } else {
                window.localStorage.coinList = [...favList, coinId];
                setLike(true);
            }
        } else {
            window.localStorage.coinList = coinId;
            setLike(true);
        }
    };

    useEffect(() => {
        if (window.localStorage.coinList) {
            let favList = window.localStorage.coinList.split(",");
            if (favList.includes(coinId)) {
                setLike(true);
            }
        }
    }, []);

    return (
        <img
            onClick={() => idChecker(coinId)}
            src={like ? "./assets/star-full.svg" : "./assets/star-empty.svg"}
            alt="icon-star"
        />
    );
};

export default StarIcon;
