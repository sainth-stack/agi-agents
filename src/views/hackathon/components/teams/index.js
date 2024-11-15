import './index.css'
import profile1 from '../../../../assets/images/12.jpeg'
import profile2 from '../../../../assets/images/13.jpeg'
import profile3 from '../../../../assets/images/kalyan.jpg'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
const teamMembers = [
    {
        name: "Vijay Gunti",
        title: "Agentic AI Specialist",
        imageUrl: profile1,
        linkedInUrl: "https://www.linkedin.com/in/vijaygunti/?originalSubdomain=in",
    },
    {
        name: "Kalyan Doppalapudi",
        title: "Development Director",
        imageUrl: profile3,
        linkedInUrl: "https://www.linkedin.com/in/kalyan-doppalapudi-18895016/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
        name: "Ashok Boddeda",
        title: "Enterprise AI Strategist",
        imageUrl: profile2,
        linkedInUrl: "https://www.linkedin.com/in/ashok-boddeda-4791309/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    }
];
const TeamSection = () => (
    <div className="team-section">
        <h2>Meet The Team</h2>
        <div className="team-members">
            {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                    <img src={member.imageUrl} alt={member.name} />
                    <div style={{display:'flex',gap:'12px',marginTop:'20px',marginLeft:"40px"}}>
                        <div>
                            <h3>{member.name}</h3>
                            <p>{member.title}</p>
                        </div>
                        <div className="social-icons">
                            <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon style={{ color: '#0077b5' }} fontSize="large" />
                            </a>
                            {member.twitterUrl && (
                                <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer">
                                    <TwitterIcon style={{ color: '#1DA1F2' }} fontSize="large" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>

);

export default TeamSection;
