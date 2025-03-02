import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUpload } from "react-icons/fa";
import API from "../axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // For loading animation

const CreateRecipe = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token, navigate]);

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    cookingTime: "",
    image: null,
    imagePreview: null,
    youtubeUrl: "",
    category: "Breakfast",
    type: "Veg",
    ingredients: [""],
    steps: [""],
  });

  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...recipe[field]];
    newArray[index] = value;
    setRecipe({ ...recipe, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ""] });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setRecipe({
          ...recipe,
          image: file,
          imagePreview: reader.result,
        });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Recipe:", recipe);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("description", recipe.description);
    formData.append("cookingTime", Number(recipe.cookingTime) || 0);
    formData.append("category", recipe.category);
    formData.append("type", recipe.type);
    formData.append("youtubeUrl", recipe.youtubeUrl);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("steps", JSON.stringify(recipe.steps));
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    console.log("FormData being sent:", [...formData.entries()]);

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await API.post("/recipes/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Recipe Created Successfully!");
      console.log(response.data);

      // Redirect to Dashboard after successful creation
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating recipe:", error.response?.data || error);
      alert("Failed to create recipe.");
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="col-md-8 col-lg-6 p-4 shadow rounded bg-white">
        <h2 className="text-center mb-4 fw-bold text-danger">🍽️ Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Recipe Name" value={recipe.name} onChange={handleChange} className="form-control mb-3" />
          <textarea name="description" placeholder="Recipe Description" value={recipe.description} onChange={handleChange} className="form-control mb-3"></textarea>
          <input type="text" name="cookingTime" placeholder="Cooking Time" value={recipe.cookingTime} onChange={handleChange} className="form-control mb-3" />

          <div className="mb-3 text-center p-3 border rounded" style={{ borderStyle: "dashed", cursor: "pointer" }}>
            <label htmlFor="imageUpload" className="form-label d-block">
              {recipe.imagePreview ? (
                <img src={recipe.imagePreview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: "120px" }} />
              ) : (
                <div className="text-muted"><FaUpload size={24} className="mb-2" /><p>Click to Upload Image</p></div>
              )}
            </label>
            <input type="file" id="imageUpload" className="form-control d-none" onChange={handleImageChange} />
          </div>

          <input type="text" name="youtubeUrl" placeholder="YouTube Video URL" value={recipe.youtubeUrl} onChange={handleChange} className="form-control mb-3" />

          <div className="row mb-3">
            <div className="col">
              <select name="category" value={recipe.category} onChange={handleChange} className="form-select">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div className="col">
              <select name="type" value={recipe.type} onChange={handleChange} className="form-select">
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>
          </div>

          <h5>Ingredients</h5>
          {recipe.ingredients.map((ingredient, index) => (
            <input key={index} type="text" value={ingredient} onChange={(e) => handleArrayChange(index, e.target.value, "ingredients")} placeholder={`Ingredient ${index + 1}`} className="form-control mb-2" />
          ))}
          <button type="button" onClick={() => addArrayItem("ingredients")} className="btn btn-success mb-3">+ Add Ingredient</button>

          <h5>Steps</h5>
          {recipe.steps.map((step, index) => (
            <input key={index} type="text" value={step} onChange={(e) => handleArrayChange(index, e.target.value, "steps")} placeholder={`Step ${index + 1}`} className="form-control mb-2" />
          ))}
          <button type="button" onClick={() => addArrayItem("steps")} className="btn btn-info mb-3">+ Add Step</button>

          <button type="submit" className="btn btn-danger w-100 mt-3" disabled={loading}>
            {loading ? <><FaSpinner size={20} className="spinner-border spinner-border-sm mr-2" /> Creating Recipe...</> : "Create Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
