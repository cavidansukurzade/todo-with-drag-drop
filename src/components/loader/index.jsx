import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop({
  loading,
  color = "#1e82d9",
  background = "",
}) {
  return (
    <Backdrop
      sx={{
        color: color,
        background,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
