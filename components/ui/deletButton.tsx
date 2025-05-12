"use client"
import { IconButton } from "@mui/material"
import { DeleteIcon } from "lucide-react"
export default function DeletButton(){
    return(
        <IconButton
                  size="small"
                  color="error"
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  onClick={() => {}}
        >
                  <DeleteIcon />
        </IconButton>
    )
}