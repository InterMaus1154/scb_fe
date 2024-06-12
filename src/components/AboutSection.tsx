import {FC} from 'react';
import "@styles/About.css";
import hotel_img from "@assets/hotel_img.jpg";
import hotel_img_2 from "@assets/hotel_img_2.webp";
import {NavLink} from "react-router-dom";

const AboutSection: FC = () => {
    return (
        <section className="about-section full-width">
            <div className="wrapper-inner">
                <div className="about-section-block">
                    <h1 className="section-heading">About Us</h1>
                    <h2>Read about who we are and what is our mission</h2>
                    <div className="about-block-wrapper">
                        <div className="about-block block">
                            <div className="paragraphs">
                                <p>
                                    At Smile Canine Boarding, we understand that your dog is more than just a
                                    pet—they're a
                                    beloved member of your family. As a small, family-owned dog hotel, we provide
                                    personalized and attentive care to ensure that your furry friend feels safe, happy,
                                    and
                                    loved while you're away.
                                </p>
                            </div>
                            <div className="img-wrapper">
                                <img src={hotel_img} alt="A drawn image of a dog hotel"/>
                            </div>
                        </div>
                        <div className="about-block block">
                            <div className="img-wrapper">
                                <img src={hotel_img_2} alt="An image of happy dogs looking into the camera"/>
                            </div>
                            <div className="paragraphs">
                                <p>
                                    Our mission is simple: to offer a home away from home for dogs of all shapes and
                                    sizes.
                                    Located in a serene and secure environment, our facility features comfortable
                                    accommodations and spacious play areas where dogs can socialize, exercise, and
                                    relax.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-section-block">
                    <h1 className="section-heading">Our values</h1>
                    <h2>This is us. This is what we live by.</h2>
                    <div className="value-boxes">
                        <div className="value-box">
                            <span className="value-header"><span
                                className="value-number">1</span> Personalized Care</span>
                            <p className="value-content">We believe in treating every dog like family. Each furry guest
                                receives personalized attention tailored to their unique needs and preferences.
                            </p>
                        </div>
                        <div className="value-box">
                        <span className="value-header"><span
                            className="value-number">2</span> Safety and Security</span>
                            <p className="value-content">Your dog's well-being is our priority. Our facility is designed
                                to
                                be secure and peaceful, ensuring a safe and comfortable environment.
                            </p>
                        </div>
                        <div className="value-box">
                            <span className="value-header"><span className="value-number">3</span> Transparent Communication</span>
                            <p className="value-content">Stay connected with your dog while you're away. We provide
                                regular
                                updates and photos so you can see how much fun they're having.
                            </p>
                        </div>
                        <div className="value-box">
                            <span className="value-header"><span
                                className="value-number">4</span> Passionate Team</span>
                            <p className="value-content">Meet our team of dedicated animal lovers who are committed to
                                making your dog's stay enjoyable and memorable.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="about-section-block">
                    <h1 className="section-heading">Meet Our Team</h1>
                    <h2>Meet our dog carers and lovers. Meet us.</h2>
                    <div className="meet-section">
                        <p>
                            Get to know the passionate individuals behind Smile Canine Boarding who make every stay
                            special.
                            Discover the faces behind the smiles.
                        </p>
                        <NavLink to={'/team'}>Meet us here &rarr;</NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;