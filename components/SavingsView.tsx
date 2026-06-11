import CardView from './CardView';
import { ThemedText } from "./themed-text";

type Props = {
  savedTrips: Array<{ from: string; to?: string; price: string; scanned: boolean }>;
  ticketPrice: number;
};

export default function SavingsView({ savedTrips, ticketPrice }: Props) {

    const totalPrice = savedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);

    const calculateCostScanned = () => {
        const scannedTrips = savedTrips.filter(trip => trip.scanned);
        return scannedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);
    }
    
    const calculateScannedSaved = () => {
        return calculateCostScanned() - ticketPrice;
    };

  return (
    <CardView>
        <ThemedText style={{ marginBottom: 8 }}>Savings:</ThemedText>
        <ThemedText style={{ marginBottom: 4 }}>Total Saved: {(totalPrice - ticketPrice).toFixed(2)}€</ThemedText>
        <ThemedText>Total Saved on Scanned Trips: {calculateScannedSaved().toFixed(2)}€</ThemedText>
        <ThemedText>
        {(() => {
            const schwartzFahrerStrafzettelPreis = 60;
            const caughtSchwartzFahren = savedTrips.filter(trip => trip.scanned).length
            const fineTotal = ((caughtSchwartzFahren * schwartzFahrerStrafzettelPreis) + calculateCostScanned())
            const schwartzFahren = ticketPrice - fineTotal;
            var returnStr = "Had you not bought any tickets, ";
            if(schwartzFahren > 0) {
            return returnStr + "you would have saved " + schwartzFahren.toFixed(2) + "€ and gotten away with " + totalPrice.toFixed(2) + "€ in unpaid fares.";
            } else {
            returnStr += "you would have been fined " + caughtSchwartzFahren + " times, totally " + fineTotal.toFixed(2) + "€ in fines.";
            
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
    </CardView>
  );
}