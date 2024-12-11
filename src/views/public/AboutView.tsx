import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

// Import the content
import aboutContent from "@/content/aboutContent";

const AboutView = () => {
  return (
    <Container>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        {aboutContent.title}
      </Typography>

      {/* Introduction */}
      <Typography variant="body1">
        {aboutContent.introduction}
      </Typography>

      <div> {/* Use <div> here instead of <Typography> for the social links */}
        {aboutContent.socialLinks.map((link, index) => (
          <div key={index}>
            <Link href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AboutView;
