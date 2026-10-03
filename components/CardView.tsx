import { useThemedStyles } from '@/constants/commonStyles';
import { ThemedView } from "./themed-view";

type Props = {
  children: React.ReactNode;
};

export default function CardView({ children }: Props) {
    const styles = useThemedStyles();

    return (
        <ThemedView style={styles.cardContainer}>
            {children}
        </ThemedView>
    );
}
