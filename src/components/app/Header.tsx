import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

function Header() {
  return (
    <Sheet component="header" variant="solid" color="primary" sx={{ p: 2 }}>
      <Typography level="h1">Pacer</Typography>
    </Sheet>
  );
}

export default Header;