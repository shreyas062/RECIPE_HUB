import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://recipe-hub-backend-e5yl.onrender.com/api/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  if (loading) {
    return <h2 style={styles.loading}>Loading...</h2>;
  }

  if (!recipe) {
    return <h2 style={styles.error}>Recipe not found</h2>;
  }

  const videoId = recipe.youtubeUrl ? getYouTubeVideoId(recipe.youtubeUrl) : null;

  return (
    <div style={styles.container}>
      {/* Recipe info container */}
      <div style={styles.recipeBox}>
        <h1 style={styles.title}>{recipe.name || "No Title"}</h1>
        <img src={recipe.image} alt={recipe.name} style={styles.image} />
        <p style={styles.description}>{recipe.description}</p>
        <div style={styles.infoContainer}>
          <p style={styles.info}><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
          <p style={styles.info}><strong>Category:</strong> {recipe.category}</p>
          <p style={styles.info}><strong>Type:</strong> {recipe.type}</p>
        </div>
      </div>

      {/* Ingredients container */}
      <div style={styles.ingredientsBox}>
        <h2 style={styles.sectionTitle}>Ingredients</h2>
        <ul style={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} style={styles.ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Steps container */}
      <div style={styles.stepsBox}>
        <h2 style={styles.sectionTitle}>Steps</h2>
        {recipe.steps.map((step, index) => (
          <div key={index} style={styles.step}>
            <p><strong>Step {index + 1}:</strong> {step}</p>
          </div>
        ))}
      </div>

      {/* Watch Video section */}
      <div style={styles.watchVideo}>
        <p>Watch this Recipe Video</p>
        {/* Embed YouTube video if URL is provided */}
        {videoId ? (
          <div style={styles.videoEmbed}>
            <iframe
              width="100%" // Make sure it occupies full width of the container
              height="600" // Adjust height as necessary
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Recipe Video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p style={styles.error}>Video not available</p>
        )}
      </div>
    </div>
  );
}

// Helper function to extract YouTube video ID from the URL
function getYouTubeVideoId(url) {
  if (!url) return null;
  const videoIdMatch = url.match(/(?:youtube\.com(?:\/[^\/\n\s]+\/\S+\/|\S+\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return videoIdMatch ? videoIdMatch[1] : null;
}

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    maxWidth: "1200px",
    margin: "auto",
    backgroundColor: "#f5f5f5",
  },
  recipeBox: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    marginBottom: "40px",
    width: "100%",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    height: "auto",
    borderRadius: "15px",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    color: "#666",
    margin: "10px 0 20px 0",
    lineHeight: "1.6",
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  info: {
    fontSize: "16px",
    color: "#444",
    fontWeight: "600",
    padding: "5px 10px",
  },
  ingredientsBox: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "15px",
  },
  ingredientsList: {
    listStyleType: "none",
    padding: "0",
    fontSize: "16px",
    color: "#444",
  },
  ingredient: {
    marginBottom: "10px",
  },
  stepsBox: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    marginBottom: "40px",
  },
  step: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "15px",
  },
  watchVideo: {
    textAlign: "center",
    marginTop: "40px",
    paddingBottom: "40px",
  },
  videoEmbed: {
    marginTop: "20px",
    width: "900px", // Full width
    height: "600px", // Fixed height of the iframe
    maxWidth: "100%", // Max width is 100% for responsiveness
    borderRadius: "10px",
    overflow: "hidden",
  },
  loading: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "24px",
    color: "#444",
  },
  error: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "24px",
    color: "#e74c3c",
  },
};

export default RecipeDetails;
