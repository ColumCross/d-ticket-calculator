import { styles } from '@/constants/commonStyles';
import { ThemedView } from "./themed-view";

type Props = {
  children: React.ReactNode;
};

export default function CardView({ children }: Props) {
    return (
        <ThemedView style={styles.cardContainer}>
            {children}
        </ThemedView>
    );
}