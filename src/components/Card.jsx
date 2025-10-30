import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  console.log(expand);
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function RecipeReviewCard({
  name,
  image,
  instructions,
  cuisine,
  ingredients,
  reviewCount,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={name}
        subheader={`Cuisine: ${cuisine}`}
        titleTypographyProps={{
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      />
      <CardMedia component="img" height="194" image={image} alt={name} />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            height: 100,
            overflow: "hidden",
          }}
        >
          <b>Ingredients:</b> {ingredients.join("\n")}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2">Reviews: {reviewCount}</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>

          <Typography sx={{ marginBottom: 2 }}>
            {instructions.join(" ")}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
