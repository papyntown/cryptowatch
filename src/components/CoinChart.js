import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
    Area,
    AreaChart,
    CartesianAxis,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import colors from "../styles/_settings.scss";

const CoinChart = ({ coinName, coinId }) => {
    const [duration, setDuration] = useState(30);
    const [coinData, setCoinData] = useState();
    // lors du map le double tableau va me permettre dans le map choisir choisir les tableau 1 a 1
    // periode [0] correspond à 1 puis 3 puis 7 .. et periode[1] correspond 1j 3j 1m
    const headerData = [
        [1, "1 jour"],
        [3, "3 jours"],
        [7, "7 jours"],
        [30, "1 mois"],
        [91, "3 mois"],
        [181, "6 mois"],
        [365, "1 an"],
        [3000, "Max"],
    ];
    useEffect(() => {
        let dataArray = [];
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
                    duration > 32 ? "&interval=daily" : ""
                }`
            )
            .then((res) => {
                for (let i = 0; i < res.data.prices.length; i++) {
                    let price = res.data.prices[i][1];
                    dataArray.push({
                        date: new Date(
                            res.data.prices[i][0]
                        ).toLocaleDateString(),
                        price: price < "50" ? price : parseInt(price),
                    });
                }
                setCoinData(dataArray);
            });
    }, [coinId, duration]);

    return (
        <div className="coin-chart">
            <p>{coinName}</p>
            <div className="btn-container">
                {headerData.map((periode) => {
                    return (
                        <div
                            key={periode[0]}
                            htmlFor={"btn" + periode[0]}
                            onClick={() => setDuration(periode[0])}
                            className={
                                periode[0] === duration ? "active-btn" : ""
                            }>
                            {periode[1]}
                        </div>
                    );
                })}
            </div>
            <AreaChart
                width={680}
                height={250}
                data={coinData}
                margin={{ top: 10, right: 0, left: 100, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="7%"
                            stopColor={colors.color1}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="93%"
                            stopColor={colors.white1}
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke={colors.color1}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </div>
    );
};

export default CoinChart;
