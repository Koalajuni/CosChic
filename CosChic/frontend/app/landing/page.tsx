
import IncNavbar from "@/components/IncNavbar";
import IncHero from "@/components/IncHero";
import IncAnaly from "@/components/IncAnaly";
import IncNews from "@/components/IncNews";
import IncCard from "@/components/IncCard";

export default function Main() {
    return(
        <>
        <IncNavbar />
        {/* <div className="flex min-h-screen flex-col max-w-2xl mx-auto">
        <div className="min-h-[30vh]"></div> */}
        <hr className='border-black-400' />
        {/* <div className="min-h-[30vh]"></div> */}
        {/* </div> */}
        <IncAnaly />
        <hr className='border-black-400' />
        <IncHero />
        <hr className='border-black-400' />
        <IncNews />
        {/*IncCard*/}
        </>
    )
}