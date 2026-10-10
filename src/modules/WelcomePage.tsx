import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LottieAnimation from "../config/assets/LottieAnimation.json";
import { RootState } from "../redux/store";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: theme,
        padding: 4,
      }}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
      >
        <Typography
          color={theme === "dark" ? "white" : "dark"}
          fontWeight="bold"
          gutterBottom
          variant="h4"
        >
          User &amp; Blog Dashboard
        </Typography>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography
          color={theme === "dark" ? "white" : "dark"}
          maxWidth="600px"
          variant="h6"
        >
          Explore a React dashboard for managing users and their blog posts.
          Browse, edit, and organize content in one place.
        </Typography>
      </motion.div>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Lottie
          animationData={LottieAnimation}
          style={{ width: "50vw", maxWidth: "300px", height: "auto" }}
        />
      </Box>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => navigate("/users")}
          sx={{
            mt: 4,
            px: 4,
            py: 1.5,
            bgcolor: theme,
            color: theme === "dark" ? "white" : "dark",
            fontWeight: "bold",
            borderRadius: "20px",
            boxShadow: 3,
            "&:hover": { bgcolor: theme, boxShadow: 6 },
          }}
          variant="contained"
        >
          Open Dashboard
        </Button>
      </motion.div>
    </Box>
  );
};

export default WelcomePage;
