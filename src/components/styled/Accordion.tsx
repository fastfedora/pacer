import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default function StyledAccordion({
  label,
  defaultExpanded,
  children,
}: {
  label: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        borderBottom: "none",
        borderTopStyle: "solid",
        borderTopColor: "neutral.700",
        borderTopWidth: 1,
      }}
    >
      <AccordionSummary variant="solid" color="neutral">
        {label}
      </AccordionSummary>
      <AccordionDetails slotProps={{
        content: {
          sx: {
            background: 'var(--palette-common-white)',
            p: 2,
          }
        },
      }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
