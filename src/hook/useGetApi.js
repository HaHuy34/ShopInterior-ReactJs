// import axios from "axios";
// import { useEffect, useState } from "react";

// const useGetApi = (URL_LINK) => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const getApi = async () => {
//       const res = await axios({
//         method: "get", //lay ve
//         url: URL_LINK,
//       });
//       setData(res.data);
//     };
//     getApi();
//   }, []);
//   return [data, setData];
// };

// export default useGetApi;

// useGetApi.js
import axios from "axios";
import { useEffect, useState } from "react";

const useGetApi = (URL_LINK) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios({
          method: "get",
          url: URL_LINK,
        });
        setData(res.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    getApi();
  }, [URL_LINK]); // Include URL_LINK as a dependency to fetch data when it changes

  return [data, loading];
};

export default useGetApi;
