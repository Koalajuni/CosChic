
import IncNavbar from "@/components/inc_navbar";
import IncHero from "@/components/inc_landingHero";
import IncAnaly from "@/components/inc_landingText";
import IncNews from "@/components/inc_news";
import IncLandingExplanation from "@/components/inc_landingExplanation";
import IncTestText from "@/components/test_landingText";


export default function Main() {
    return (
        <>
            <IncNavbar />
            {/* <div className="flex min-h-screen flex-col max-w-2xl mx-auto">
        <div className="min-h-[30vh]"></div> */}
            <hr className='border-black-400' />
            {/* <div className="min-h-[30vh]"></div> */}
            <IncTestText />
            <hr className='border-black-400' />
            <IncAnaly />
            <hr className='border-black-400' />
            <IncLandingExplanation />
            <hr className='border-black-400' />
            <IncHero />
            <hr className='border-black-400' />
            <IncNews />
        </>
    )
}