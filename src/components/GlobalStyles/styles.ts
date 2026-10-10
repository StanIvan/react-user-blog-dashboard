import { styled } from "@mui/material/styles";

const APP_BAR_MOBILE = 20;
const APP_BAR_DESKTOP = 20;

export const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

export const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "95vh",
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
  },
}));
