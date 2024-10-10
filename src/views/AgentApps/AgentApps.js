import React, { useState } from 'react';
import { cardData } from '../../data/DataJson';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';

const AgentApps = () => {
    const navigate = useNavigate();
    // Define state for votes
    const [voteCounts, setVoteCounts] = useState(cardData.map(() => 0)); // Initialize with zero votes for each card

    const handleUpvote = (index) => {
        const newVoteCounts = [...voteCounts];
        newVoteCounts[index] += 1; // Increment the vote count for the specific card
        setVoteCounts(newVoteCounts);
    };

    const handleCardClick = (href) => {
        navigate(href); // Navigate to the specified href
    };

    return (
        <div className="flex">
            <div className="flex flex-col items-center w-full p-4 overflow-y-scroll max-h-96">
                <h1 className="text-3xl font-bold mb-4">Agent Apps</h1>

                {/* Container for the card grid with fixed height */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full   place-items-center  ">
                    {/* Set height to 600px or adjust it based on your preference */}
                    {cardData.map((card, index) => (
                        <div onClick={() => handleCardClick(card.href || "#")} className=' w-auto h- hover:shadow-lg flex  justify-center '>

                            <Card
                                key={index}
                                title={card.title}
                                heading={card.heading}
                                // href={card.href}
                                icon={
                                    <div className="flex relative w-full ">
                                        <div className="text-3xl mr-2 flex">
                                            {card.icon} {/* Render the icon */}
                                        </div>
                                        <div className="relative flex items-center justify-center text-sm font-semibold px-2 text-center bg-orange-50 border-2 border-orange-200 rounded-lg">
                                            {voteCounts[index]} Votes {/* Render the vote count */}
                                        </div>
                                    </div>
                                }
                                configureButton={
                                    <button
                                        onClick={() => handleUpvote(index)}
                                        className="mt-4 text-black border-2 rounded-lg p-1 hover:bg-slate-100"
                                    >
                                        Upvote
                                    </button>
                                }
                                specificType={card.type} // Pass specific type
                                author="Vishnu" // Default author
                                Createdby={"Created by"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AgentApps;
