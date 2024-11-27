// src/app/prispevok/[prispevokId]/komentar/[komentarId]/page.tsx
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

export const metadata = {title: 'Domov | Zoškasnap'};

export default function KomentarID({
  params,

}: {
  params: {
    prispevokId: string;
    komentarId: string;
  },

}) {
  
  return (
   <Container>
    <Typography> Komentar {params.komentarId} prispevku {params.prispevokId}</Typography>
    <Typography> Prispevok cislo {params.prispevokId} a k nemu priradeny komentar {params.komentarId}</Typography>
   </Container>
  
  );
}
