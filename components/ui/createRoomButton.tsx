"use client"
import { useState, useEffect } from 'react';
import { Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import { createClient } from '@/utils/supabase/client';
import { useTranslation } from "react-i18next";
export default function CreateEntryButton() {
  const codeSize = 6
  const supabase = createClient()
  const [inputValue, setInputValue] = useState('');
  const [testData,setTestData] = useState(null)
  const [slugCode,setSlugCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  async function generateUniqueCode(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let attempts = 0;
    const maxAttempts = 10; // Sécurité pour éviter les boucles infinies
  
    while (attempts < maxAttempts) {
      // Générer un code aléatoire
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      // Vérifier si le code existe déjà
      const { data, error } = await supabase
        .from('InviteSlugs')
        .select('code')
        .eq('code', result)
        .maybeSingle();
  
      if (error) {
        console.error('Erreur Supabase:', error);
        attempts++;
        continue;
      }
  
      if (!data) { // Si data est null, le code n'existe pas
        return result;
      }
  
      attempts++;
      console.log('Code déjà utilisé, nouvelle tentative...');
    }
  
    throw new Error('Impossible de générer un code unique après plusieurs tentatives');
  }

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

      const uniqueCode = await generateUniqueCode(codeSize);

      const {data:slugData, error:slugError} = await supabase
      .from('InviteSlugs')
      .insert([{
        code: uniqueCode,
      }])
      .select()

      const slugId = slugData[0].id;
      const newSlugCode = slugData[0].code;
      const { data, error } = await supabase
        .from('Sessions') 
        .insert([{ 
          title: inputValue, 
          creator_id: session.user.id, // ID de l'utilisateur connecté
          slug: slugId,
        }])
        .select();
        setTestData(data)
      if (error) throw error;
      setInputValue('');
      setSnackbar({ open: true, message: 'Entrée créée avec succès!', severity: 'success' });
      if(!session.user.is_anonymous){
        const {data:room_data,error:room_error} = await supabase
            .from('Rooms')
            .insert([{
              owner : session.user.id,
              name : inputValue,
              slug: slugId,
            }])
            .select();
        if (room_error) throw room_error;
      }
      window.location.href = `/createRoom/${newSlugCode}`;
    } catch (error) {
      console.error('Error creating entry:', error);
      setSnackbar({ open: true, message: error.message || 'Erreur lors de la création', severity: 'error' });
    }
    finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <TextField
        fullWidth
        label={t('sessionTile')}
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
        {loading ? t('creating...') : t('createSession')}
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