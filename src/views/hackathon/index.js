
import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

import robo from '../../assets/images/robo.webp'
import { baseURL } from '../../const';
import Toast from '../../components/toast';
import { useNavigate } from 'react-router-dom';
import TeamSection from './components/teams';
import Repo from './components/repo';
const AgentHackathon = () => {
    const defaultdata = {
        firstName: '',
        lastName: '',
        email: '',
        github: '',
        country: '',
        linkedin: '',
        affiliation: '',
        agree: false,
    }
    const [form, setForm] = useState(defaultdata);
    const [toast, setToast] = useState({ message: '', type: '' });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', form.firstName);
        formData.append('last_name', form.lastName);
        formData.append('email', form.email);
        formData.append('github_profile', form.github);
        formData.append('linkedin_profile', form.linkedin);
        formData.append('country', form.country);
        formData.append('affiliation_status', form.affiliation);
        formData.append('file_path', form.file);

        try {
            const response = await axios.post(`${baseURL}/submission/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Show success toast if the request is successful
            setToast({ message: 'Registration successfull!', type: 'success' });
            console.log('Response:', response.data);
            setForm(defaultdata)
        } catch (error) {
            // Show error toast if there is an issue with the request
            setToast({ message: 'Failed to create planner. Please try again.', type: 'error' });
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className="hackathon-container">
            {/* Existing design code here... */}
            <div class="header">
                <div class="header-text"></div>
                <button class="about-tensorops">About WYGE</button>
            </div>

            <div class="main-content">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <div className='title22'>
                        <h1 class="">AGENTIC AI</h1>
                        <span class="highlight">HACKATHON</span>
                    </div>
                    <p class="date-location">December 8 2024 | Online</p>
                    <div class="button-group">
                        <button class="register-btn">Register Now</button>
                        <button class="sponsor-btn" onClick={() => navigate('/sponsership')}>Sponsor</button>
                    </div>
                </div>
                <div class="robot-image">
                    <img src={robo} alt="Robot" width="150" />
                </div>
            </div>

            <div className="expectations">
                <h2>What to expect?</h2>
                <ul>
                    <li>🤖 Create cutting-edge AI agents for any innovative use case you have in mind</li>
                    <li>📚 Develop a comprehensive tutorial on your AI creation</li>
                    <li>👥 Participate as a sole or team, whatever works for you!</li>
                    <li>⏰ Flexible 72-hour schedule to fit your availability</li>
                    <li>🚀 Submit by opening a pull request to the well-known GenAI-Agents repository</li>
                    <li>🌟 Become a valued contributor to a trending open-source project</li>
                    <li>🏆 Compete for substantial prizes and industry recognition</li>
                    <li>🎓 Learn from industry experts through webinars and online workshops</li>
                    <li>💬 Connect with participants and mentors via the online Discord chat</li>
                </ul>
            </div>


            <TeamSection />
            <Repo />

            <div className="form-container">
                <h2>Join AI Agents Virtual Hackathon</h2>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <p className="form-note">
                        *Please note that submitting your registration does <strong>not</strong> guarantee a spot in the hackathon.
                        You will receive a confirmation email if your participation is approved.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>First name *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last name *</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>GitHub profile *</label>
                            <input
                                type="url"
                                name="github"
                                placeholder="GitHub profile URL"
                                value={form.github}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Country *</label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Enter your country"
                                value={form.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn profile URL *</label>
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn profile URL"
                                value={form.linkedin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Affiliation or Current status *</label>
                        <input
                            type="text"
                            name="affiliation"
                            placeholder="e.g., Company Name, University, Independent Developer..."
                            value={form.affiliation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group full-width" >
                        <label className="checkbox-container" style={{ display: 'flex', gap: '4px', width: '100%', marginTop: '20px', alignItems: 'center', justifyContent: 'center' }}>
                            <input
                                type="checkbox"
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                                required
                                style={{ width: '20px', marginBottom: '4px' }}
                            />
                            By registering for this event, you agree to the <a href="#terms">terms and conditions</a>
                        </label>
                    </div>

                    <button type="submit" className="submit-btn">Send</button>
                </form>
            </div>
            {toast.message && (
                <Toast
                    message={toast.message}
                    onClose={() => setToast({ message: '', type: '' })}
                    type={toast.type}
                />
            )}
        </div>
    );
}

export default AgentHackathon;
