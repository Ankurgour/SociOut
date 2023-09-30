import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
// import WidgetWrapper from "components/WidgetWrapper";
import WidgetWrapper from "components/widgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.secondary.dark;
  const main = palette.secondary.main;
  const medium = palette.secondary.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${process.env.REACT_APP_BACKEND}assets/advertisement.jpg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Patel Harvester</Typography>
        <Typography color={medium}>Patelharvesters.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      the best service given for harvesting crops
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;