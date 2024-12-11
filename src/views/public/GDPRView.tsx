// src/views/public/GDPRView.tsx

"use client"; // This marks the component as a client-side component

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BackButton from "@/components/BackButton"; // Ensure correct import path
import { gdprContent } from "@/content/gdprContent"; // Import the GDPR content

const GDPRView = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {gdprContent.title} {/* Display the title */}
      </Typography>
      {gdprContent.paragraphs.map((paragraph, index) => (
        <Typography key={index} variant="body1">
          {paragraph} {/* Display each paragraph */}
        </Typography>
      ))}
      <BackButton />
    </Container>
  );
};

export default GDPRView;
