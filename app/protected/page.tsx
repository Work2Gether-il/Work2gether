import AuthButton from "@/components/header-auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/nav-bar";
import { Box, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomizedSteppers from "@/components/customize-stepper";
import HomeComponent from "@/components/home";

export default async function ProtectedPage() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <HomeComponent isConnected={!!user}/>
    </>
  );
}
