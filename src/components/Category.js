import React, { useEffect, useState, useRef } from "react";
import apiService from "../api/apiServices";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";
import MCard from "./MCard";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Skeleton from "@mui/material/Skeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useMovie from "../hooks/useMovie";

const yearList = [
  { id: 2000, label: "2000" },
  { id: 2010, label: "2010" },
  { id: 2020, label: "2020" },
  { id: 2021, label: "2021" },
  { id: 2022, label: "2022" },
  { id: 2023, label: "2023" },
];

export default function Category() {
  const [openYear, setOpenYear] = useState(false);
  const [openGenres, setOpenGenres] = useState(true);
  const [loading, setLoading] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [genreId, setGenreId] = useState();
  const [yearId, setYearId] = useState(2000);
  const { setMovie, movieList, isLoading } = useMovie();
  const [searchResults, setSearchResults] = useState([]);
  
  const prevGenreId = useRef();
  const prevYearId = useRef();

  // Fetch genres list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(res.data.genres);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  // Fetch movies based on genre or year
  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
      try {
        setLoading(true);
        if (genreId && genreId !== prevGenreId.current) {
          setYearId(null);
          const res = await apiService.get(`${url}&with_genres=${genreId}`);
          setMovie(res.data.results);
          setSearchResults([]); // Clear search results
          prevGenreId.current = genreId;
        } else if (yearId && yearId !== prevYearId.current) {
          setGenreId(null);
          const res = await apiService.get(`${url}&year=${yearId}`);
          setMovie(res.data.results);
          setSearchResults([]); // Clear search results
          prevYearId.current = yearId;
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [genreId, yearId, setMovie]);

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Typography variant="h5" my={3}>
        CATEGORY
      </Typography>
      <Divider />
      <Stack flexDirection="row" width="100%" justifyContent="space-between">
        <Stack minWidth="150px" width={{ xs: "10%" }}>
          {/* Genres */}
          <Box>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpenGenres(!openGenres)}
              sx={{
                pr: 2,
                pt: 2.5,
                pb: openGenres ? 0 : 2.5,
                "&:hover, &:focus": {
                  "& svg": { opacity: openGenres ? 1 : 0 },
                },
              }}
            >
              <ListItemText
                primary="Genres"
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary="Action, Drama, Thriller, Anime, Romantic, ..."
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: openGenres
                    ? "rgba(0,0,0,0)"
                    : "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDownIcon
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: openGenres ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {openGenres &&
              genresList.map((genre) => (
                <ListItemButton
                  key={genre.id}
                  onClick={() => setGenreId(genre.id)}
                >
                  <ListItemText
                    primary={genre.name}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
                  />
                </ListItemButton>
              ))}
          </Box>

          {/* Year */}
          <Box>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpenYear(!openYear)}
              sx={{
                pr: 2,
                pt: 2.5,
                pb: openYear ? 0 : 2.5,
                "&:hover, &:focus": {
                  "& svg": { opacity: openYear ? 1 : 0 },
                },
              }}
            >
              <ListItemText
                primary="Year"
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary="2000, 2010, 2020, 2021, 2022, 2023"
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: openYear ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDownIcon
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: openYear ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {openYear &&
              yearList.map((year) => (
                <ListItemButton key={year.id} onClick={() => setYearId(year.id)}>
                  <ListItemText
                    primary={year.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </Stack>

        <Grid container spacing={2}>
          {loading || isLoading
            ? placeholder.map((_, index) => (
                <Grid item xs={6} md={3} key={index}>
                  {detailSkeleton}
                </Grid>
              ))
            : (searchResults.length > 0 ? searchResults : movieList).map((item) => (
                <Grid item xs={6} md={3} key={item.id}>
                  <MCard item={item} />
                </Grid>
              ))}
        </Grid>
      </Stack>
    </>
  );
}
