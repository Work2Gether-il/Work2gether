"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { createClient } from "@/utils/supabase/client";

const allowedDomains = ["nc-uapv.col1n.fr", "nextcloud-uapv.col1n.fr"];
const defaultUrl = "https://www.col1n.fr/nodoc.html";

export default function DocumentPlayer({ url: initialUrl = "", roomId }) {
  const supabase = useMemo(() => createClient(), []);
  const [url, setUrl] = useState(initialUrl || defaultUrl);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    const saveUrlToDatabase = async () => {
      try {
        const urlDomain = new URL(url).hostname;

        if (allowedDomains.includes(urlDomain)) {
          const { error } = await supabase
            .from("Sessions")
            .update({ document_url: url })
            .eq("id", roomId);

          if (error) {
            console.error("Erreur lors de la sauvegarde de l'URL :", error);
          } else {
            console.log("URL sauvegardée avec succès !");
          }

          const { error: broadcastError } = await supabase
            .from(`broadcast:${roomId}-document`)
            .insert({ document_url: url });

          if (broadcastError) {
            console.error("Erreur lors de la diffusion du message :", broadcastError);
          } else {
            console.log("Message diffusé avec succès !");
          }
        } else {
          console.warn("Le domaine de l'URL n'est pas autorisé :", urlDomain);
        }
      } catch (err) {
        console.error("Erreur lors du traitement de l'URL :", err);
      }
    };

    saveUrlToDatabase();
  }, [url, roomId, supabase]);

  const handleDialogOpen = () => {
    if(newUrl == defaultUrl)
      setNewUrl("");
    else
      setNewUrl(url);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleUrlChange = () => {
    setUrl(newUrl || defaultUrl);
    setDialogOpen(false);
  };

    return (
      <Box
      display={"flex"}
      justifyContent={"center"}
      mt={2}
      height={"25%"}
      >
      <iframe src={url} frameBorder="0" style={{ width: "100%", height: "100%" }}></iframe>
      <Button variant="contained" color="primary" onClick={handleDialogOpen} style={{ marginTop: "10px" }}>
        Modifier l'URL
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Modifier l'URL du document</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nouvelle URL"
            type="text"
            fullWidth
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleUrlChange} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}