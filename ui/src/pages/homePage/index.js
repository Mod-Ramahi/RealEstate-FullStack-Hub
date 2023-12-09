import React from "react";
import CarouselHead from "../../components/mainPaageHead/CaroselHead";
import Cards from "../../components/cards/Cards";
import SearchArea from "../../components/searchbox/SearchArea";

const HomePage = () => {
    return (
        <>
            <CarouselHead />
            <Cards />
            <SearchArea />
        </>
    )
}

export default HomePage;