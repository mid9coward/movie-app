import React from "react";
import Grid from "@mui/material/Grid";
import TrendingCardGroup from "../components/TrendingCardGroup";
import Category from "../components/Category";

function HomePage() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent={{ md: "center", xs: "flex-end" }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item direction="column" container>
          <TrendingCardGroup />
        </Grid>

        <Grid item direction="column" mt={4} container>
          <Category />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;