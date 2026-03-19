import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  savedTrips: Array<{ from: string; to?: string; price: string; scanned: boolean }>;
  ticketPrice: number;
};

export default function SavingsView({ savedTrips, ticketPrice }: Props) {

    const totalPrice = savedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);
    
    const calculateScannedSaved = () => {
        const scannedTrips = savedTrips.filter(trip => trip.scanned);
        const totalPrice = scannedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);
        return totalPrice - ticketPrice;
    };

  return (
    <ThemedView style={styles.cardContainer} darkColor={Colors.dark.cardBackground}>
        <ThemedText darkColor="#ffffff" style={{ marginBottom: 8 }}>Savings:</ThemedText>
        <ThemedText darkColor="#ffffff" style={{ marginBottom: 4 }}>
        Total Saved: {(totalPrice - ticketPrice).toFixed(2)}€
        </ThemedText>
        <ThemedText darkColor="#ffffff">
        Total Saved on Scanned Trips: {calculateScannedSaved().toFixed(2)}€
        </ThemedText>
        <ThemedText darkColor="#ffffff">
        {(() => {
            const schwartzFahrerStrafzettelPreis = 60;
            const caughtSchwartzFahren = savedTrips.filter(trip => trip.scanned).length
            const schwartzFahren = ticketPrice - (caughtSchwartzFahren * schwartzFahrerStrafzettelPreis);
            var returnStr = "Had you not bought any tickets, ";
            if(schwartzFahren > 0) {
            return returnStr + "you would have saved " + schwartzFahren.toFixed(2) + "€ and gotten away with " + totalPrice.toFixed(2) + "€ in unpaid fares.";
            } else {
            returnStr += "you would have been fined " + caughtSchwartzFahren + " times, totally " + (caughtSchwartzFahren * schwartzFahrerStrafzettelPreis).toFixed(2) + "€ in fines.";
            
            //returnStr += " Had you not been caught, you would have saved " + (d_ticket_price + totalPrice).toFixed(2) + "€.";
            //returnStr += " Instead, you only really got away with ";

            //returnStr += " You would have gotten away with ";

            // You would have avoided paying €53.00 for trips, €28.00 of which you would have gotten away with.”

            returnStr += " You would have avoided paying ";
            returnStr += totalPrice.toFixed(2) + "€ for trips, ";
        

            const unscannedTrips = savedTrips.filter(trip => !trip.scanned);
            const totalunPrice = unscannedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);

            // returnStr += totalunPrice.toFixed(2) + "€ in unpaid fares.";
            returnStr += totalunPrice.toFixed(2) + "€ of which you would have gotten away with.";

            return returnStr;
            }

        })()}
        </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.dark.background,
  },
  cardContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    gap: 8,
    backgroundColor: Colors.dark.cardBackground,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  savedTripItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8, 
    justifyContent: 'space-between',
    borderRadius: 12,
    gap: 8,
    padding: 8,
  }

});