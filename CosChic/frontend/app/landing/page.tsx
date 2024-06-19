
import IncNavbar from "@/components/inc_navbar";
import IncHero from "@/components/inc_landingHero";
import IncAnaly from "@/components/inc_landingText";
import IncNews from "@/components/inc_news";
import IncCard from "@/components/inc_landingHero";

export default function Main() {
    return (
        <>
            <IncNavbar />
            <IncAnaly />
            <IncHero />
            <IncNews />
            {/*IncCard*/}
        </>
    )
}