import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.container}
    >
      <motion.h1 
        style={styles.title}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        About Recipe Hub
      </motion.h1>
      
      <motion.p style={styles.text} whileHover={{ scale: 1.02 }}>
        Welcome to <strong>Recipe Hub</strong> – your ultimate destination for discovering, sharing, and enjoying delicious recipes from around the world.
      </motion.p>
      
      <motion.h2 style={styles.subtitle} whileHover={{ scale: 1.1 }}>Our Mission</motion.h2>
      <p style={styles.text}>
        At Recipe Hub, we believe that cooking is more than just preparing food – it's an experience that brings people together.
      </p>
      
      <motion.ul style={styles.list}>
        <motion.li whileHover={{ scale: 1.05 }}>✅ A diverse range of recipes for every taste and dietary preference.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>✅ Easy-to-follow instructions that make cooking fun and stress-free.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>✅ A community where passionate cooks can share their culinary creativity.</motion.li>
      </motion.ul>
      
      <motion.h2 style={styles.subtitle} whileHover={{ scale: 1.1 }}>What We Offer</motion.h2>
      <motion.ul style={styles.list}>
        <motion.li whileHover={{ scale: 1.05 }}>🍽 <strong>Wide Variety of Recipes</strong> – From comforting classics to exciting new dishes.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>🌱 <strong>Dietary Options</strong> – Explore vegetarian, vegan, gluten-free, and healthy alternatives.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>📝 <strong>Step-by-Step Guides</strong> – Simple and easy-to-follow instructions.</motion.li>
        <motion.li whileHover={{ scale: 1.05 }}>❤️ <strong>Community Engagement</strong> – Share recipes, leave reviews, and connect with food enthusiasts.</motion.li>
      </motion.ul>

      <motion.h2 style={styles.subtitle} whileHover={{ scale: 1.1 }}>Join Our Community</motion.h2>
      <p style={styles.text}>
        Whether you're looking for a quick meal, a special dessert, or a festive feast, Recipe Hub is here to make your culinary journey exciting.
      </p>
      
      <motion.p style={styles.contact} whileHover={{ scale: 1.05 }}>
        <strong>📩 Get in Touch:</strong> Contact us at <a href="mailto:support@recipehub.com">support@recipehub.com</a>
      </motion.p>
    </motion.div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    padding: "40px",
    background: "E0FFFF",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#ff6600",
  },
  subtitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "20px",
    color: "#333",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "20px",
    color: "#444",
  },
  list: {
    textAlign: "left",
    fontSize: "18px",
    lineHeight: "1.8",
    paddingLeft: "20px",
    color: "#666",
  },
  contact: {
    fontSize: "18px",
    marginTop: "20px",
    color: "#007bff",
  },
};

export default About;
