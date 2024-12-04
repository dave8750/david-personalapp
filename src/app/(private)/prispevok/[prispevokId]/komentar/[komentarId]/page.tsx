// src/app/prispevok/[prispevokId]/komentar/komentarId/page.tsx
 
import Typography from "@mui/material/Typography";
 
export const metadata= {title: 'Detail Komentar | ZoskaSnap'}
 
export default function KomentarId({params}: {
  params: {
    prispevokId: string;
    komentarId: string;
  }
 
}){
  return (
      <Typography> koment cislo: {params.komentarId} od prispevku s cislom: {params.prispevokId} </Typography>
  );
}