
import IncNavbar from "@/components/inc_navbar";
import IncHero from "@/components/inc_landingHero";
import IncAnaly from "@/components/inc_landingText";
import IncNews from "@/components/inc_news";
import IncTestText from "@/components/test_landingText";

export default function Main() {
    return (
        <>
            <IncNavbar />
            {/* <div className="flex min-h-screen flex-col max-w-2xl mx-auto">
        <div className="min-h-[30vh]"></div> */}
            <hr className='border-black-400' />
            {/* <div className="min-h-[30vh]"></div> */}
            {/* </div> */}
            <IncAnaly />
            {/* <IncTestText /> */}
            <hr className='border-black-400' />
            <IncHero />
            <hr className='border-black-400' />
            <IncNews />
        </>
    )
}