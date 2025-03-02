import { useEffect, useState, useRef } from "react";
import RecipeCard from "../components/RecipeCard"; // Import the RecipeCard component

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const recipeSectionRef = useRef(null);

  const images = [
    "/assets/bg.jpg",
    "/assets/bg2.jpg",
    "/assets/bg3.jpg",
  ];

  // Fetch all recipes
  const fetchAllRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    recipeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const title = recipe.name || "No Title";
    const categoryMatch = category === "All" || recipe.category === category;
    const typeMatch = type === "All" || recipe.type === type;
    const searchMatch = search === "" || title.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        {/* Image Slider Container */}
        <div style={styles.slider}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                ...styles.slideImage,
                opacity: index === currentImageIndex ? 1 : 0, // Show only the active image
              }}
            />
          ))}
        </div>

        <h1 style={styles.title}>Welcome to Recipe Hub</h1>
        <p style={styles.subtitle}>Discover and share amazing recipes!</p>
        <button style={styles.exploreBtn} onClick={handleExploreClick}>
          Explore Recipes
        </button>
      </div>

      {/* Filters Section */}
      <div style={styles.filtersContainer}>
        <select style={styles.dropdown} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <select style={styles.dropdown} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          style={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipe List Section */}
      <div ref={recipeSectionRef} style={styles.recipeList}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          <p style={styles.loading}>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  hero: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "50px",
    borderRadius: "15px",
    color: "#fff",
    marginBottom: "20px",
    width: "90%",
    minHeight: "390px",
    overflow: "hidden",
  },
  slider: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Added shadow effect
  },
  slideImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 1s ease-in-out",
  },

  filtersContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    width: "100%",
    maxWidth: "800px",
    padding: "15px 0",
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    cursor: "pointer",
    width: "150px",
  },
  search: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    width: "220px",
    outline: "none",
  },
  recipeList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "66px",
    width: "95%",
    maxWidth: "1200px",
    paddingTop: "20px",
    gridRowGap: "10px",
    gridColumnGap: "80px",
  },
  loading: {
    color: "#fff",
    fontSize: "20px",
  },
  title: {
    fontSize: "50px",
    fontWeight: "bold",
    marginBottom: "10px",
    zIndex: 2,
  },
  subtitle: {
    fontSize: "22px",
    marginBottom: "20px",
    zIndex: 2,
  },
  exploreBtn: {
    padding: "10px 20px",
    fontSize: "18px",
    background: "#ff5722",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    zIndex: 2,
  },
};

export default Home;
