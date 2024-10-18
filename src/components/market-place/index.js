import React from 'react';
import { Link } from 'react-router-dom';

const MarketPlaceCard = ({
    title,
    description,
    icon,
    votes,
    visibility,
    href,
    category,
    creator,
}) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow bg-white">
            <Link to={href} className="flex flex-col h-full text-gray-800 no-underline">
                <div className="flex justify-between items-center mb-2">
                    {/* Icon */}
                    <div className="text-3xl">{icon}</div>
                    {/* Visibility badge */}
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {visibility}
                    </span>
                </div>

                {/* Title */}
                <div className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors">{title}</div>

                {/* Description */}
                <div className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</div>

        
                {/* Votes */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {votes} Votes
                    </span>
                    {/* View Button */}
                    <button className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                        View →
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default MarketPlaceCard;
