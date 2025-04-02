"use client"
import { useState, useEffect } from 'react';
import { Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import { createClient } from '@/utils/supabase/client'; // Importez votre client Supabase

export default function CreateEntryButton() {
  const supabase = createClient()
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setSnackbar({ open: true, message: 'Le champ ne peut pas être vide', severity: 'error' });
      return;
    }

    if (!session) {
      setSnackbar({ open: true, message: 'Vous devez être connecté', severity: 'error' });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('Sessions') 
        .insert([{ 
          title: inputValue, 
          creator_id: session.user.id, // ID de l'utilisateur connecté
        }])
        .select();

      if (error) throw error;
      
      setInputValue('');
      setSnackbar({ open: true, message: 'Entrée créée avec succès!', severity: 'success' });
    } catch (error) {
      console.error('Error creating entry:', error);
      setSnackbar({ open: true, message: error.message || 'Erreur lors de la création', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <TextField
        fullWidth
        label="Nouvelle entrée"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading || !session}
        fullWidth
      >
        {loading ? 'Création...' : 'Créer une entrée'}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}