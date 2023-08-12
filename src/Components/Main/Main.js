import React from 'react';
import Services from '../Services/Services';
import './Main.css';
import viImg from "../../Assets/vi.jpg";
import viImg2 from "../../Assets/vi2.jpg";

function Main() {
  return (
    <main data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example"
        tabIndex="0">
        <section className="py-lg-18 py-md-10  py-8 bg-dark" id="home">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-xl-5 col-md-6  col-lg-6 col-12">
                        <div className="mb-5 mb-md-0">
                            <h1 className="mt-4 mb-4 display-3 fw-semibold">Hi, I'm CRUNCH</h1>
                            <span className="mb-2 text-primary">Welcome to CrunchIt</span>
                            <p className="mb-2 lead">Your one stop to both Human & AI virtual assistant
                             with ease and a fraction of the industry's price.</p>
                             <p className="mb-6 lead">$2.99/hr availability. 4X cheaper and better than industry standard.</p>
                            <a href="#" className="btn btn-primary">Hire Now</a>
                        </div>
                    </div>
                    <div className="col-xl-5 offset-xl-2 col-md-5 offset-md-1 col-lg-5 offset-lg-1  col-12">
                        <div className="position-relative">
                            <img src={viImg} alt="about" style={{height: '200px'}}
                                className="img-fluid position-relative z-1 rounded-4 ms-lg-n5 ms-md-n3"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="py-lg-18 py-md-10 py-8" id="aboutme">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-xl-5  col-md-6 col-lg-6 col-12">
                        <div className="p-3 mb-5 mb-md-0">
                            <div className="position-relative">
                                <img src={viImg2} alt="about" style={{height: '200px'}}
                                    className="img-fluid position-relative z-1 rounded-4 ms-lg-5 ms-3 ms-md-4"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 offset-xl-1  col-md-5 offset-md-1 col-lg-5 offset-lg-1 col-12">
                        <div className="">
                            <h2 className="mb-5">
                                Make Money <span className="text-primary"> On Us</span>
                            </h2>
                            <p>Have your own Agency/Platform and you want to add a hire VA option
                                for members/customers of your business to improve retention and grow revenue?
                                 Look no further as we allow you to white label our services and offer as yours
                                 on your platform at ANY price you choose for no additional fee on our end.
                                 See custom integrations below
                            </p>
                            <p className="mb-6">Know anyone needing our service? Earn 15% referral commission for EVERY
                             PURCHASE made by them or the business forever. Passive income doesn't get more passive.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="py-lg-18 py-md-10 py-8 bg-dark" id="myportfolio">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 offset-xl-3 col-md-12  col-lg-8 offset-lg-2 col-12">
                        <div className="text-center mb-5 mb-lg-8">
                            <h2 className="mb-4">Save More <span className="text-primary">Than Time</span></h2>
                            <p className="mb-0">CrunchIt is built to serve the broad spectrum of your needs. From corporate needs to
                                individual needs and petty tasks, we provide Quick & Quality VAs that are ready to go
                                and ready to learn your unique use case. We dont just give you our experts, we let
                                you make them into your own expert with our optional orientation program you can
                                add to any of your orders for free
                            </p>
                            <a href="#" className="mt-4 btn btn-primary">Try Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Services></Services>
        <section className=" py-lg-18 py-md-10 py-8 bg-dark" id="myservice">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 offset-xl-3 col-md-12  col-lg-8 offset-lg-2 col-12">
                        <div className="text-center mb-5 mb-lg-8">
                            <h2 className="mb-4">Introducing <span className="text-primary">CrunchPad</span></h2>
                            <p className="mb-0"> CrunchPad is our unique feature that allows you create a unique link for any of your
                            CrunchGigs that you can use to instantly access and share access to any gig of your choice.
                            No need for tiring logins to keep the work going.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className=" py-lg-18 py-md-10 py-8" id="myservice">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 offset-xl-3 col-md-12  col-lg-8 offset-lg-2 col-12">
                        <div className="text-center mb-5 mb-lg-8">
                            <h2 className="mb-4">Custom <span className="text-primary">integrations</span></h2>
                            <p className="mb-0"> ntegrate our service to your platform seamlessly and to much of your control. Click
                            the contact button below and a member of our team will reach out to you
                            </p>
                            <a href="#" className="btn btn-primary mt-4">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}

export default Main;
