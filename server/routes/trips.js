const express = require('express');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import the Gemini SDK

const router = express.Router();

// -------------------------------------------------------------
// Initialize Gemini client globally or once per request (recommended globally for performance)
// Ensure GEMINI_API_KEY is available as an environment variable on Render
let genAI;
try {
    if (!process.env.GEMINI_API_KEY) {
        console.error("CRITICAL ERROR: GEMINI_API_KEY environment variable is not set!");
        // If the key is absolutely critical and the server shouldn't run without it:
        // throw new Error("GEMINI_API_KEY is missing! Cannot initialize AI service.");
        // For now, we'll just log an error and handle it in generateItinerary
    } else {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        console.log("Gemini client initialized. API key (first 5 chars):", process.env.GEMINI_API_KEY.substring(0, 5) + '...');
    }
} catch (initError) {
    console.error("Failed to initialize GoogleGenerativeAI:", initError.message);
    // Handle cases where the SDK itself fails to initialize
}
// -------------------------------------------------------------

// Generate itinerary using Gemini API
async function generateItinerary(destination, days, companions, budget) {
    // Check if Gemini client was initialized successfully
    if (!genAI) {
        console.error("Gemini API client not initialized. Check GEMINI_API_KEY environment variable.");
        throw new Error('AI service not available. Gemini API key missing or invalid.');
    }

    // You can choose a different model if needed, e.g., "gemini-1.5-flash", "gemini-1.5-pro"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    
    const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}.
This is for a ${companions.toLowerCase()} trip with a budget of ₹${budget}.
Please provide a detailed hour-by-hour schedule for each day, including:
- Breakfast, lunch, and dinner recommendations
- Tourist attractions and activities
- Approximate costs for activities and meals
- Transportation suggestions
Format the response day-wise with timestamps.`;

   // trips.js - inside generateItinerary function's try block
try {
    console.log('Sending prompt to Gemini. Prompt preview:', prompt.substring(0, 200) + '...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text(); // Get the raw text content

    // --- Post-processing to remove Markdown bolding ---
    // This regex looks for ** followed by any characters (non-greedy) followed by **
    text = text.replace(/\*\*(.*?)\*\*/g, '$1'); 
    // You might also want to remove single asterisks if they appear as bullet points or italics
    // text = text.replace(/\*(.*?)\*/g, '$1'); 
    // And potentially markdown headings if they appear (#, ##, etc.)
    // text = text.replace(/^#+\s*(.*)$/gm, '$1');

    console.log('Successfully received response from Gemini.');
    return text; // Return the cleaned text

} catch (error) {
    // ... (your existing error handling) ...
}
}

// Generate and save new trip
router.post('/', auth, async (req, res) => {
    try {
        const { destination, days, companions, budget } = req.body;

        // Generate AI itinerary using the new Gemini function
        const itinerary = await generateItinerary(destination, days, companions, budget);

        // Create and save trip
        const trip = new Trip({
            user: req.userId,
            destination,
            days,
            companions,
            budget,
            itinerary
        });

        await trip.save();
        console.log('Trip saved to database successfully.');
        res.status(201).json(trip);
    } catch (error) {
        console.error('Error in trip generation route:', error); // More specific error logging
        res.status(500).json({ message: error.message || 'Failed to create trip due to an AI service error.' });
    }
});

// Get all trips for user
router.get('/', auth, async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error); // Add specific logging
        res.status(500).json({ message: 'Failed to fetch trips' });
    }
});

// Get single trip by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const trip = await Trip.findOne({ _id: req.params.id, user: req.userId });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        console.error('Error fetching single trip:', error); // Add specific logging
        res.status(500).json({ message: 'Failed to fetch trip' });
    }
});

// Delete trip
router.delete('/:id', auth, async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error); // Add specific logging
        res.status(500).json({ message: 'Failed to delete trip' });
    }
});

module.exports = router;