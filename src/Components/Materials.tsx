import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
 
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function Materials() {
  return (
    <Stack spacing={2}>
      <Rating
        name="half-rating-read"
        defaultValue={2.5}
        precision={0.5}
        readOnly
        size="large"
      />

<Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">
    MUI
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href="/material-ui/getting-started/installation/"
  >
    Core
  </Link>
  <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
</Breadcrumbs>
      <Stack direction="row" spacing={2} >
        <Button variant="text" sx={{ color: 'green' , backgroundColor: '#f0f0f0'}}>Option 1</Button>
        <Button variant="text" sx={{ color: 'green' , backgroundColor: '#f0f0f0'}}>Option 2</Button>
        <Button variant="text" sx={{ color: 'green', backgroundColor: '#f0f0f0' }}>Option 3</Button>
      </Stack>
    </Stack>
  );
}
