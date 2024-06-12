import {FC} from 'react';
import FreePage from "@pages/free/FreePage.tsx";
import "@styles/Landing.css";
import BannerVideo from "@assets/video/bg_video_banner.mp4";
import {NavLink} from 'react-router-dom';
import TestimonySection from "@components/TestimonySection.tsx";
import AboutSection from "@components/AboutSection.tsx";

const Landing: FC = () => {
    return (
        <FreePage>
            <section className={"hero-section full-width"}>
                <div className="video-overlay">
                    <div className="box">
                        <h1>Welcome to our Page!</h1>
                        <h2>Going on holiday but don't have anybody to take care of your pet?</h2>
                        <h3>We got you covered! <NavLink to={'/booking/add'}>Book a place today!</NavLink></h3>
                    </div>
                </div>
                <video src={BannerVideo} autoPlay={true} loop={true} controls={false} muted={true}></video>
            </section>
            <AboutSection />
            <TestimonySection/>
        </FreePage>
    );
};

export default Landing;