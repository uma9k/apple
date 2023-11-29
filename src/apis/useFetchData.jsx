import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [profiles, setprofiles] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [isProfilesloading, setIsProfilesloading] = useState(true);
  const [fetchProfileError, setFetchProfileError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPageInfo(data.info);
        setprofiles(data.results);
      } catch (error) {
        setFetchProfileError(error);
      } finally {
        setIsProfilesloading(false);
      }
    };

    fetchData();
  }, [url]);

  return { pageInfo, profiles, isProfilesloading, fetchProfileError };
};

export default useFetchData;
