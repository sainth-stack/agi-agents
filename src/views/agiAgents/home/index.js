import React, { useState, useEffect } from "react";
import "./data.css";
import img1 from "../../../assets/icon1.png";
import img2 from "../../../assets/icon2.png";
import img3 from "../../../assets/icon3.png";
import img4 from "../../../assets/icon2.png";
import img5 from "../../../assets/icon3.png";
import img6 from "../../../assets/icon6.png";
import img7 from "../../../assets/icon2.png";
import img8 from "../../../assets/icon8.png";
import img9 from "../../../assets/icon9.png";
import ChildCard from "../../../components/Card/ChildCard";
import { useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFreeCodeCamp, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FaFreeCodeCamp, FaMoneyBillAlt } from "react-icons/fa";
import PrepLoader from "../../../components/prep-loader/loader";
import { FaThumbsUp } from "react-icons/fa";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
export default function AgentHubHome() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [accessoryModel, setAccessoryModel] = useState("");
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");
  const [sort, setSort] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [industrySearch, setIndustrySearch] = useState("");

  const categoriesList = [
    "Personal Assistant",
    "Coding",
    "Digital Workers",
    "Productivity",
    "AI Agents Builder",
    "Research",
    "Content Creation",
    " Data Analysis",

    "Customer Service",
    "Transition",
    "AI Agents Builder",

    "Coding",
    " WorkFlow",
    "Other",
  ];
  const industriesList = [
    "Government",
    "Fintech",
    "Retail",
    "Education",
    "Transportaion",
    "Healthcare",
    "Productivity",
    "Legal",
    "E-commerce",
    "Media",
    "Agriculture",
  ];
  // // State to track the number of likes
  // const [likes, setLikes] = useState(0);

  // // Function to handle the like button click
  // const handleLike = () => {
  //   setLikes(likes + 1);

  const [likes, setLikes] = useState(0);

  // This should be inside the component
  useEffect(() => {
    // Effect logic here
    console.log("Effect ran when component mounted or likes changed");
  }, [likes]); // Add the necessary dependencies

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes(likes + 1); // Example logic for incrementing likes
  };

  // Handle change functions for the filters
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleAccessoryModelChange = (e) => setAccessoryModel(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleIndustryChange = (e) => setIndustry(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  const handleCategorySearchChange = (e) => setCategorySearch(e.target.value);
  const handleIndustrySearchChange = (e) => setIndustrySearch(e.target.value);

  const handleCategoryCheckboxChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const handleIndustryCheckboxChange = (industry) => {
    const updatedIndustries = selectedIndustries.includes(industry)
      ? selectedIndustries.filter((item) => item !== industry)
      : [...selectedIndustries, industry];
    setSelectedIndustries(updatedIndustries);
  };

  useEffect(() => {
    setLoading(true);

    const fetchAgents = async () => {
      try {
        const queryParams = [];

        if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
        if (accessoryModel)
          queryParams.push(
            `accessory_model=${encodeURIComponent(accessoryModel)}`
          );
        if (selectedCategories.length) {
          selectedCategories.forEach((category) => {
            queryParams.push(`category=${encodeURIComponent(category)}`);
          });
        }

        if (selectedIndustries.length) {
          selectedIndustries.forEach((industry) => {
            queryParams.push(`industry=${encodeURIComponent(industry)}`);
          });
        }

        if (sort) queryParams.push(`sort=${encodeURIComponent(sort)}`);

        const queryString = queryParams.length
          ? `?${queryParams.join("&")}`
          : "";

        const response = await fetch(
          `http://13.215.228.42:4001//api/agent_list${queryString}`
        );
        const data = await response.json();

        const images = [img1, img6, img2, img8, img5, img6, img7, img8, img9];
        const updatedData = data.agents.map((agent) => ({
          id: agent[0],
          name: agent[1],
          description: agent[2],
          category: agent[3]?.replace(/"/g, ""),
          industry: agent[4]?.replace(/"/g, ""),
          pricing_model: agent[5]?.replace(/"/g, ""),
          api_type: agent[6]?.replace(/"/g, ""),
          date: agent[7],
          url: agent[8],
          tagline: agent[9]?.replace(/"/g, ""),
          duration: agent[10],
          overview: agent[11],
          features: agent[12],
          use_cases: agent[13],
          author: agent[14],
          visibility: agent[15],
          tags: agent[16],
          logo: agent[18],

          preview_image: agent[17]?.replace(/"/g, ""),
          demo_video: agent[18]?.replace(/"/g, ""),
          img: images[agent[0] % images.length],
        }));

        setLoading(false);
        setAgents(updatedData);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, [search, accessoryModel, selectedCategories, selectedIndustries, sort]);

  const filteredCategories = categoriesList.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredIndustries = industriesList.filter((industry) =>
    industry.toLowerCase().includes(industrySearch.toLowerCase())
  );

  const location = useLocation();

  return (
    <>
      <div className="w-12/12 bg-gray-100 ">
        <div
          className={`bg-slate-50 shadow-md rounded-lg  ${
            location.pathname == "/agnets-hub" ? "w-12/12" : ""
          }`}
        >
          {/* // <Navbar /> */}
          <div
            className="text-black"
            style={{
              color: "black",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <h1 className="explore text-black p-2 ">
              Explore the World of AI Agents
            </h1>

            <p className="list text-black">
              Enter To World Of Collected List Of 100+ AI Agents{" "}
            </p>
            <input
              placeholder="Search for AI Agent here..."
              className="input mb-5 shadow-md rounded-lg p-2 ml-1"
              style={{ width: "40%" }}
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-container bg-slate-100 border-1 border-gray-50">
            <div className="filter-section shadow-md outline-none rounded-lg">
              <h3>Refine Search</h3>
              <div className="categories">
                <h4>Categories</h4>
                <input
                  type="text"
                  placeholder="Search categories"
                  className="filter-search input  shadow-md rounded-lg p-2 ml-1 "
                  value={categorySearch}
                  onChange={handleCategorySearchChange}
                />
                {/* <div>
              <input type="checkBox" />
              <label className="All">ALL</label>
            </div> */}

                <div
                  className="checkbox-group"
                  style={{ height: "200px", overflow: "auto" }}
                >
                  {filteredCategories.map((category, index) => (
                    <label key={index} style={{ display: "flex", gap: "7px" }}>
                      <input
                        type="checkBox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryCheckboxChange(category)}
                      />
                      {category}
                      {/* ({Math.floor(Math.random() * 50) + 1}) */}
                    </label>
                  ))}
                </div>
              </div>
              <div className="industries">
                <h4>Industries</h4>
                <input
                  type="text"
                  placeholder="Search industries"
                  className="filter-search input shadow-md rounded-lg p-2 ml-1"
                  value={industrySearch}
                  onChange={handleIndustrySearchChange}
                />
                {/* <div>
              <input type="checkbox"/>
              <label className="All">ALL</label>
            </div> */}
                <div
                  className="checkbox-group"
                  style={{ height: "200px", overflow: "auto" }}
                >
                  {filteredIndustries.map((industry, index) => (
                    <label key={index} style={{ display: "flex", gap: "7px" }}>
                      <input
                        type="checkBox"
                        //className="w-5"
                        checked={selectedIndustries.includes(industry)}
                        onChange={() => handleIndustryCheckboxChange(industry)}
                      />
                      {industry}
                      {/* ({Math.floor(Math.random() * 50) + 1}) */}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="agents-section">
              <div className="agents-header pr-3">
                <div className="view-switch">
                  {/* <button className="view-button active">Grid</button>
                            <button className="view-button">List</button> */}
                </div>
                <div className="sort-dropdown pr-4">
                  <select
                    className="sort-select"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    {/* <option value="popular">Popular</option> */}
                  </select>
                </div>
              </div>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PrepLoader />
                </div>
              ) : (
                <div className="agents-list">
                  {agents.map((agent) => {
                    return <ChildCard agent={agent} navigate={navigate} />;
                  })}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
