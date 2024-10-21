import React from 'react';
import { FiUsers, FiActivity, FiCpu } from 'react-icons/fi'; // React icons
import Card from '../../components/Card/Card';
import CustomCard from './../../components/CustomCard/CustomCard';

const Home = () => {
    return (
        <div className="bg-white w-full h-[100vh]  ">
            {/* Home Title */}
            <div className="flex">
                <h1 className="text-3xl font-bold relative top-[1.5rem]">Dashboard</h1>
            </div>

            {/* Dashboard Cards */}
            <div className="grid gap-4 w-full relative top-[3rem] sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl shadow-md border text-card-foreground bg-slate-100 cursor-pointer">
                    <div className="w-full p-6 pt-0 h-24 mt-6 flex flex-col items-center justify-center">
                        <div className="text-opacity-50 text-2xl font-bold">
                            Agentic AI Studio <br />
                            <p className="text-xs font-extralight">Start building</p>
                        </div>
                    </div>
                </div>
                <Card
                    title="Credits Used"
                    icon={<FiCpu size={24} />}
                    count={"2/100"}
                    style={{ backgroundColor: 'red' }}
                />
                <Card
                    title="Agents"
                    icon={<FiUsers size={24} />}
                    count={4}
                />
                <Card
                    title="Tools"
                    icon={<FiActivity size={24} />}
                    count={3}
                />
            </div>

            {/* API Details Section */}
            {/* <div className="relative top-16 max-w-[60%] bg-white" style={{
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <CustomCard
                    title="Your API Key"
                    heading="Here is your API key for Agent API, passed as x-api-key header:"
                    apiKey="****************"  // Placeholder for actual key
                    apiEndpoint="https://agent.api.lyzr.app"  // Placeholder for endpoint
                />
            </div> */}
        </div>
    );
};

export default Home;
