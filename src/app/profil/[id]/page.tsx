// src/app/profil/[id]/page.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const metadata = {title: 'Detail profilu| Zoškasnap'};


export default function ProfilID({params}: {
  params: {id: string}
}) {
  return(
    <Container>
    <Typography>detail o profile {params.id}</Typography>
    </Container>
  )

  
}