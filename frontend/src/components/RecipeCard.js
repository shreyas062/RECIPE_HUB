import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure this is imported

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate(); // Initialize navigate function here

  const handleClick = () => {
    navigate(`/recipe/${recipe._id}`); // Navigates to the details page with the recipe ID
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <div style={styles.imageContainer}>
        <img src={recipe.image} alt={recipe.name} style={styles.image} />
      </div>
      <div style={styles.info}>
        <h3 style={styles.title}>{recipe.name}</h3>
        <p style={styles.description}>{recipe.description}</p>
        <div style={styles.cardFooter}>
          <span style={styles.viewButton}>View Recipe</span>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  card: {
    width: "350px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
    position: "relative",
    margin: "20px",
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
  },
  info: {
    padding: "20px",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
    letterSpacing: "0.5px",
    transition: "color 0.3s ease",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  cardFooter: {
    marginTop: "10px",
  },
  viewButton: {
    padding: "8px 15px",
    fontSize: "14px",
    backgroundColor: "#ff7e5f",
    color: "#fff",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },

  // Hover Effects
  cardHover: {
    transform: "scale(1.05)", // Slight zoom effect on hover
    boxShadow: "0px 12px 25px rgba(0, 0, 0, 0.3)", // Deeper shadow on hover
  },

  titleHover: {
    color: "#ff7e5f", // Change title color on hover
  },

  viewButtonHover: {
    backgroundColor: "#ff4e4e", // Darker shade for hover
  },
};

// Add hover effect by modifying the inline style dynamically
const RecipeCardWithHover = ({ recipe }) => {
  const navigate = useNavigate(); // Initialize navigate here
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      style={{ ...styles.card, ...(isHovered && styles.cardHover) }}
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.imageContainer}>
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{
            ...styles.image,
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>
      <div style={styles.info}>
        <h3 style={{ ...styles.title, ...(isHovered && styles.titleHover) }}>
          {recipe.name}
        </h3>
        <p style={styles.description}>{recipe.description}</p>
        <div style={styles.cardFooter}>
          <span
            style={{
              ...styles.viewButton,
              ...(isHovered && styles.viewButtonHover),
            }}
          >
            View Recipe
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardWithHover;
