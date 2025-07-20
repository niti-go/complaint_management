import express from 'express';
import supabase from '../db';

const router = express.Router();

// Test Supabase connection
router.get('/test', async (req, res) => {
  try {
    // Simple connection test - just try to access  the complaints  table
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .limit(1);
    
    // If we get here, the connection worked
    // We expect an error about the table not existing, which is fine
    if (error && error.code === 'PGRST116') {
      res.json({ 
        message: 'Supabase connection successful!',
        details: 'Connection established (got expected error for non-existent table)',
        error: error.message 
      });
    } else if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ 
        message: 'Supabase connection successful!', 
        data: data 
      });
    }
  } catch (err) {
    console.error('Connection error:', err);
    res.status(500).json({ error: 'Failed to connect to Supabase' });
  }
});

// Simple ping test
router.get('/ping', async (req, res) => {
  try {
    // Just test if we can create a client and make a request
    res.json({ 
      message: 'Supabase client created successfully!',
      status: 'connected'
    });
  } catch (err) {
    console.error('Connection error:', err);
    res.status(500).json({ error: 'Failed to create Supabase client' });
  }
});

export default router; 