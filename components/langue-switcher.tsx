'use client';
import { useTranslation } from 'react-i18next';
import { MenuItem, Menu, Button } from '@mui/material';
import React, { useState } from 'react';

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: 'white' }}>
        🌐 {i18n.language.toUpperCase()}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => changeLanguage('en')}>🇬🇧 English</MenuItem>
        <MenuItem onClick={() => changeLanguage('fr')}>🇫🇷 Français</MenuItem>
      </Menu>
    </>
  );
}

