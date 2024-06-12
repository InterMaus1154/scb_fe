import {FC} from 'react';
import "@styles/Testimony.css";
import Testimonies from "@assets/json/testimonies.json";
import TestimonyBox from "@components/TestimonyBox.tsx";


const TestimonySection: FC = () => {
    return (
        <section className="testimony-section full-width">
            <div className="wrapper-inner">
                <h1 className="section-heading">Testimony</h1>
                <h2 className="section-subheading">See what others said about us</h2>
                <div className="testimony-boxes">
                    {
                        Testimonies.map((testimony, idx) => <TestimonyBox key={idx} content={testimony.content} year={testimony.year} author={testimony.author}/>)
                    }
                </div>
            </div>
        </section>
    );
};

export default TestimonySection;