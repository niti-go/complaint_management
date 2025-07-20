import express from 'express';
const router = express.Router();
import supabase from '../db';

// // Placeholder route
// router.get('/', (req, res) => {
//   res.send('Hello from the complaints route!');
// });

//GET /complaints. List all complaints
router.get('/', async (req, res) => {
  try {
    const {data, error} = await supabase
      .from('complaints')
      .select('*')
      .order('submission_date', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }
    
    // Send response even if table is empty
    res.json({ 
      data: data || [], 
      count: data ? data.length : 0,
      message: data && data.length > 0 ? 'Complaints found' : 'No complaints found'
    });
    
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /complaints → create a complaint
router.post('/', async (req, res) => {
  const { name, email, complaint } = req.body;

  if (!name.trim() || !email.trim() || !complaint.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const { data, error } = await supabase
      .from('complaints')
      .insert([
        { 
          name, 
          email, 
          complaint,
          submission_date: new Date().toISOString().split('T')[0]
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error inserting complaint:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH /complaints/:id → toggle status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // First, get the current status
    const { data: currentComplaint, error: fetchError } = await supabase
      .from('complaints')
      .select('status')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Complaint not found' });
      }
      console.error('Error fetching complaint:', fetchError);
      return res.status(500).json({ error: fetchError.message });
    }

    // Determine new status based on current status
    const newStatus = currentComplaint.status === 'PENDING' ? 'RESOLVED' : 'PENDING';

    // Update the status
    const { data: updatedComplaint, error: updateError } = await supabase
      .from('complaints')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating complaint status:', updateError);
      return res.status(500).json({ error: updateError.message });
    }

    res.json(updatedComplaint);
  } catch (err) {
    console.error('Error updating complaint status:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /complaints/:id → delete a complaint
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data: deletedComplaint, error } = await supabase
      .from('complaints')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Complaint not found' });
      }
      console.error('Error deleting complaint:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ 
      message: 'Complaint deleted successfully',
      deletedComplaint 
    });
  } catch (err) {
    console.error('Error deleting complaint:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
