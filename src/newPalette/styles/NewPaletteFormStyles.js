import { styled, useTheme } from "@mui/material/styles";
import { DRAWER_WIDTH } from "./constants";
const drawerWidth = DRAWER_WIDTH;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    blockSize: "calc(100vh - 64px)",
    // overflow: "hidden",
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Container = styled("div")({
  inlineSize: "90%",
  blockSize: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonContainer = styled("div")({
  inlineSize: "100%",

  "& button": {
    inlineSize: "50%",
    marginBlockStart: "1rem",
  },
});

export { Main, DrawerHeader, Container, ButtonContainer };
