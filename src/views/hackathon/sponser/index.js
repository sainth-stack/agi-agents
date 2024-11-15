import React from 'react';
import './index.css';
import hand from '../../../assets/images/hand.webp';

const Sponsership = () => {
    return (
        <div className="sponsership-container">
            <div className="sponsership-header">
                <h1>BECOME A HACKATHON PARTNER</h1>
            </div>

            <div className="sponsership-cards">
                <div className="card platinum">
                    <h2>Platinum</h2>
                    <ul>
                        <li>Large Logo on All Pages</li>
                        <li>Featured in All Email Communications</li>
                        <li>Opportunity to Provide Prizes During Final Event</li>
                        <li>Hosting 1 Workshop/Webinar during the event</li>
                        <li>Customized Challenge or Problem Statement</li>
                        <li>Access to Participant Data (Winners Only, Opt-in)</li>
                        <li>Option to be a Judge</li>
                        <li>3 Maximum sponsors in the category</li>
                    </ul>
                </div>

                <div className="card gold">
                    <h2>Gold</h2>
                    <ul>
                        <li>Medium Logo on Homepage</li>
                        <li>Featured in 3 Email Updates</li>
                        <li>Opportunity to Provide Prizes During Final Event</li>
                        <li>Hosting 1 Workshop/Webinar during the event</li>
                        <li>Option to be a Judge</li>
                        <li>3 Maximum sponsors in the category</li>
                    </ul>
                </div>

                <div className="card silver">
                    <h2>Silver</h2>
                    <ul>
                        <li>Small Logo in Sponsors Page</li>
                        <li>Mention in 1 Email Update</li>
                        <li>Maximum sponsors in the category</li>
                    </ul>
                </div>
            </div>

            <div className="sponsership-form">
                <h2>INTERESTED IN BECOMING A HACKATHON PARTNER?</h2>
                <form className='formform'>
                    <div className="form-row">
                        <input type="text" placeholder="First name *" required />
                        <input type="text" placeholder="Last name *" required />
                    </div>
                    <div className="form-row">
                        <input type="email" placeholder="Email *" required />
                        <input type="text" placeholder="Company name *" required />
                    </div>
                    <div className="form-row sponsorship-options">
                        <label className='labellabel'>
                            <input type="radio" name="sponsorship" value="Platinum" required className='input' style={{ width: '20px', height: '20px' }} />
                            Platinum
                        </label>
                        <label className='labellabel'>
                            <input type="radio" name="sponsorship" value="Gold" className='input' style={{ width: '20px', height: '20px' }} />
                            Gold
                        </label>
                        <label className='labellabel'>
                            <input type="radio" name="sponsorship" value="Silver" className='input' style={{ width: '20px', height: '20px' }} />
                            Silver
                        </label>
                    </div>

                    <button type="submit" className='buttonbutton'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Sponsership;
