"use client";

import * as React from 'react';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface AccordionChecklistProps {
  title: string;
  items: { label: string; checked: boolean }[];
  onChange: (index: number, checked: boolean) => void;
}

export default function AccordionChecklist({ title, items, onChange }: AccordionChecklistProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Accordion
  expanded={expanded}
  onChange={handleExpansion}
>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="checklist-content"
    id="checklist-header"
  >
    <Typography component="span">{title}</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <FormGroup>
      {items.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={item.checked}
              onChange={(e) => onChange(index, e.target.checked)}
            />
          }
          label={item.label}
        />
      ))}
    </FormGroup>
  </AccordionDetails>
</Accordion>
  );
}
