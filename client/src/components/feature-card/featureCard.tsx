import { Card, Text, Button, Stack, Box } from "@mantine/core";
import classes from "./featureCard.module.css";

const FeatureCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <Card className={classes.card} padding="xl" radius="xl">
    <Box className={classes.iconWrapper}>
      {icon}
    </Box>
   <Stack align="center">
  <Text size="lg" fw={700} className={classes.title}>
    {title}
  </Text>
  <Text size="sm" className={classes.description}>
    {description}
  </Text>

  {title.includes("Monty") && (
    <div className={classes.chatBubble}>
      <p><strong>Tu:</strong> Care sunt prețurile în Poiana Brașov?</p>
      <p><strong>Monty:</strong> Abonamentul de 1 zi este 150 lei pentru adulți și 85 lei pentru copii.</p>
    </div>
  )}

  <Button className={classes.button} onClick={onClick} fullWidth radius="xl">
    {title.includes("Monty") ? "Vorbește cu Monty" : "Încarcă video"}
  </Button>
</Stack>

  </Card>
);

export default FeatureCard;
