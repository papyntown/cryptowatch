import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setListDisplay } from "../actions/list.action";
import { setStableState } from "../actions/stable.action";

const TableFilter = () => {
    const [showFavList, setShowFavList] = useState(false);
    const [showStable, setShowStable] = useState(true);
    //redux
    // dispatch veut dire fait une action
    const dispatch = useDispatch();
    // des que showstable evolue on fait un dispatch vers setStableState qui prend un booléen en paramètre
    useEffect(() => {
        dispatch(setStableState(showStable));
        dispatch(setListDisplay(showFavList));
    }, [showStable, showFavList]);
    return (
        <div className="table-filters">
            <div className="table-filters-container">
                <div className="stable-checkbox-container">
                    <input
                        type="checkbox"
                        id="stableCoin"
                        defaultChecked={true}
                        onClick={() => {
                            setShowStable(!showStable);
                        }}
                    />
                    <label htmlFor="stableCoin">
                        {showStable ? "Avec stable coin" : "Sans stable coin"}
                    </label>
                </div>
                <div
                    className={
                        showFavList ? "no-list-btn" : "no-list-btn active"
                    }
                    onClick={() => setShowFavList(false)}>
                    <p>Aucune liste</p>
                </div>
                <div
                    className={showFavList ? "fav-list active" : "fav-list"}
                    onClick={() => setShowFavList(true)}>
                    <p>Liste des favories</p>
                    <img src="./assets/star-full.svg" alt="icon star" />
                </div>
            </div>
        </div>
    );
};

export default TableFilter;
