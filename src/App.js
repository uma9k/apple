import React, { useEffect, useState } from "react";
import useFetchData from "./apis/useFetchData";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [perPage, setPerPage] = useState(10);
  const [itemsOnPage, setItemsOnPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const { pageInfo, profiles, isProfilesloading, fetchProfileError } =
    useFetchData(`https://randomuser.me/api/?page=1&results=${itemsOnPage}`);
    
  useEffect(() => {
    setItemsOnPage(perPage);
  }, [perPage]);

  const filteredProfiles = (profiles, str) => {
    if (profiles.length && str && str.length > 3) {
      return profiles.filter(
        (profile) =>
          profile.name.first.toLowerCase().includes(str.toLowerCase()) ||
          profile.name.last.toLowerCase().includes(str.toLowerCase())
      );
    }
    return profiles;
  };

  const handleLoadMore = () => {
    setItemsOnPage(Number(itemsOnPage) + Number(perPage)); // Update the mutable reference
  };

  if (isProfilesloading) {
    return <p>Loading...</p>;
  }

  if (fetchProfileError) {
    return <p>Error: {fetchProfileError.message}</p>;
  }

  const finalProfiles = profiles.length
    ? filteredProfiles(profiles, searchString)
    : [];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Experts and Staff</h2>
      </div>
      <div className="profile-filters">
        <select onChange={(e) => setPerPage(e.target.value)} value={perPage}>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="profile-search-box"
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
        />
      </div>
      <div className="profile-card-container">
        {finalProfiles.length ? (
          finalProfiles.map((profile, i) => <Card key={i} profile={profile} />)
        ) : (
          <div>Profiles Not Found</div>
        )}
      </div>
      <div className="load-btn">
        {finalProfiles.length >= itemsOnPage && (
          <button onClick={handleLoadMore}>load more</button>
        )}
      </div>
    </div>
  );
}

export default App;
