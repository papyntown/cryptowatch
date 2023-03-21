import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PercentChange from "./PercentChange";
import TableFilter from "./TableFilter";

const HeaderInfo = () => {
    const [headerData, setHeaderData] = useState([]);

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/global")
            .then((res) => setHeaderData(res.data.data));
    }, []);
    return (
        <div className="header-container">
            <ul className="title">
                <li>
                    <h1>
                        <img src="./assets/logo.png" alt="logo" /> Crypto Watch
                    </h1>
                </li>
                <li>
                    Crypto-monnaies :{" "}
                    {/* je demande d'abord si header..currencies existe (a cause du delay d'axios) si oui fais moi localstring */}
                    {headerData.active_cryptocurrencies &&
                        headerData.active_cryptocurrencies.toLocaleString()}
                </li>
                {/* pareil je demande si il existe si oui tu affiche  */}
                <li>Marchés : {headerData.markets && headerData.markets}</li>
            </ul>
            <ul className="infos-mkt">
                <li className="global-mkt">
                    Global Market cap :{" "}
                    <PercentChange
                        percent={
                            headerData.market_cap_change_percentage_24h_usd
                        }
                    />{" "}
                </li>
                <li>
                    BTC Dominance :{" "}
                    {headerData.market_cap_percentage &&
                        headerData.market_cap_percentage.btc.toFixed(1) + "%"}
                </li>
                <li>
                    ETH Dominance :{" "}
                    {headerData.market_cap_percentage &&
                        headerData.market_cap_percentage.eth.toFixed(1) + "%"}
                </li>
            </ul>
            <TableFilter />
        </div>
    );
};

export default HeaderInfo;
