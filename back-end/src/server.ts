import app from "./app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is singing me a song on port ${PORT}.
  He is a pretty bad singer by the way...`);
});
