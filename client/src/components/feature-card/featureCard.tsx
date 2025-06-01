import { Card, Text, Button, Group } from "@mantine/core";

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
  <Card shadow="md" padding="lg" radius="md" withBorder style={{ flex: 1, minWidth: 280 }}>
    <Group >
      <div style={{ fontSize: 40 }}>{icon}</div>
    </Group>
    <Text size="xl"  mt="md">
      {title}
    </Text>
    <Text size="sm" color="dimmed" mt="xs">
      {description}
    </Text>
    <Button fullWidth mt="md" radius="md" onClick={onClick}>
      Deschide
    </Button>
  </Card>
);

export default FeatureCard;
