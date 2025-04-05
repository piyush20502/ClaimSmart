const generateContent = async (prompt) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
    if (!apiKey) {
      throw new Error("API key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.");
    }
  
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error: ${error.error.message}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in generateContent:", error.message);
      throw error;
    }
  };
  
  module.exports = { generateContent };