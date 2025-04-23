"use client"
import { Button, Snackbar, Alert, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client';

interface InviteButtonProps{
    code : string
}


export default function CreateInviteButton({code}:InviteButtonProps){
    const [loading, setLoading] = useState(false);
    const [slugId,setSlugId] = useState();
    const [sessionId,setSessionId] = useState();
    const [session,setSession] = useState();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const supabase = createClient();
    const tokenSize = 6;
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
            .from('SessionJoinToken')
            .select('token')
            .eq('token', result)
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
      
        setSnackbar({ open: true, message: 'Erreur lors de la génération du code', severity: 'error' });
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
    
    useEffect(() =>{
        const fetchSessionId = async () =>{
            const {data, error} = await supabase
            .from('InviteSlugs')
            .select('id')
            .eq('code',code)
            .maybeSingle();

            const slugId = data?.id;
            setSlugId(slugId)
            const {data:session_id, error:session_error} = await supabase
            .from('Sessions')
            .select('id')
            .eq('slug',slugId)
            .maybeSingle();

            setSessionId(session_id?.id)
        }
        fetchSessionId()
    },[code])

    const handleSubmit = async () =>{
        setLoading(true)

        try{
            const unique_token = await generateUniqueCode(tokenSize);
            const {data, error} = await supabase
            .from('SessionJoinToken')
            .insert([{
                session_id: sessionId,
                token: unique_token,
                user_id : session.user.id,
            }])
            .select()
            if (error) throw error;
            setSnackbar({ open: true, message: "salle en cours d'accée", severity: 'success' });

            window.location.href = `/test/salle/${unique_token}`;
        }
        catch(error){
            setSnackbar({ open: true, message: error.message || 'Erreur lors de la création de la salle', severity: 'error' });
        }
        finally{
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
      };

    return(
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            >
                {loading ? 'Rejoindre la salle...' : 'Rejoindre la salle'}
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
    )
}