import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MCard from "./MCard";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import apiService from "../api/apiServices";
import "./TrendingCardGroup.css"; // Import CSS riêng cho trending
import { API_KEY } from "../api/config";

function TrendingCardGroup() {
  const [trendingList, setTrendingList] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cutInitial, setCutInitial] = useState([]); // Initialize as empty array
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoadingTrending(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrendingList(result);
        // Update cutInitial here
        setCutInitial([...result].splice(16, 4));
        setLoadingTrending(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchTrending();
  }, []); // Empty dependency array means it runs once on mount

  useEffect(() => {
    // Example of how to use cutInitial
    console.log("cutInitial:", cutInitial);
  }, [cutInitial]); // Add cutInitial as a dependency if you need to use it in another effect

  const getDisplayedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return trendingList.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev * itemsPerPage >= trendingList.length ? 1 : prev + 1
    );
  };

  const placeholder = [0, 1];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={450} />
    </Stack>
  );

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" my={3}>
          TRENDING
        </Typography>
        <PaginationItem type="next" onClick={handleNextPage} />
      </Stack>
      <Divider />
      <Grid container justifyContent="center" spacing={3} mt={2}>
        {loadingTrending
          ? placeholder.map((_, index) => (
              <Grid key={index} item xs={12} md={6}>
                {detailSkeleton}
              </Grid>
            ))
          : getDisplayedItems().map((item) => (
              <Grid key={item.id} item xs={12} md={6}>
                <div className="trending-card">
                  <MCard item={item} />
                </div>
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default TrendingCardGroup;
