const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 5000;

// Supabase setup
const supabaseUrl = 'https://atazblqxyckurjakirlb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YXpibHF4eWNrdXJqYWtpcmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3ODM1NDksImV4cCI6MjA1NDM1OTU0OX0.eEerBQjNb8KXzsZwdJtDqqr7n4mwWFT-GmlqfyVywPs';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  const { firstName, lastName, address, email, phone, universal_leadid, tcpaConsent } = req.body;

  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        first_name: firstName,
        last_name: lastName,
        address,
        email,
        phone,
        universal_leadid,
        tcpa_consent: tcpaConsent,
      },
    ]);

  if (error) {
    return res.status(500).json({ message: 'Error saving data', error });
  }

  res.json({ message: 'Data saved successfully', data });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});