"use client";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BackButton from "@/components/BackButton"; // Assuming BackButton is reusable

// Content import (optional, for separating terms)
import termsContent from "@/content/termsContent";

const TermsView = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, p: 3 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        {termsContent.title}
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" gutterBottom>
        {termsContent.introduction}
      </Typography>

      {/* Terms List */}
      <div>
        {termsContent.terms.map((term, index) => (
          <div key={index}>
            <Typography variant="body1" gutterBottom>
              {term}
            </Typography>
          </div>
        ))}
      </div>

      {/* Contact */}
      <Typography variant="body1" gutterBottom>
        {termsContent.contact}
      </Typography>

      {/* BackButton component to navigate back */}
      <BackButton />
    </Container>
  );
};

export default TermsView;
