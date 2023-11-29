import React from "react";
import "./index.css";

function Card({ profile }) {

  const getProfileName = (profileName) => {

    // simply operator ?: or lodash methods can be used
    let name = '';
    if (profileName) {
      name = profileName.first ? name + profileName.first : name
      name = profileName.last ? name + profileName.last : name
    }
    return name;
  }

  return (
    <div className="profile-card">
      <img src={profile.picture.large} alt={profile.picture.thumbnail} />
      <div className="profile-details">
        <div className="profile-contents">
          <div className="profile-name">
            {getProfileName(profile.name)}
          </div>
          {/* didnt found the role from API data */}
          <div className="profile-title">{profile.phone}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
