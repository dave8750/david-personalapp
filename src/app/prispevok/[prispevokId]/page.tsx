// src/app/prispevok/[prispevokId]/page.tsx
import Typography from '@mui/material/Typography';

export const metadata = {title: 'Domov | Zoškasnap'};

export default function PrispevokID({params}: {
  params: {prispevokId: string}
}) {
  return (<Typography>detail o prispevku {params.prispevokId}</Typography>);
}