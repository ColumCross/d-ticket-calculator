import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemedStyles } from '@/constants/commonStyles';
import { useThemeColors } from '@/hooks/use-theme-color';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

import CardView from '@/components/CardView';
import QuickTicket from '@/components/QuickTicket';
import SavingsView from '@/components/SavingsView';
import StationSearchBar from '@/components/StationSearchBar';
import Button from '@mui/material/Button';


export default function HomeScreen() {
  const colors = useThemeColors();
  const styles = useThemedStyles();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState('');
  const [d_ticket_price, setD_ticket_price] = useState(() => {
    if (typeof localStorage === 'undefined') {
      return 63;
    }

    const ticketPriceData = localStorage.getItem('d_ticket_price');
    return ticketPriceData ? parseFloat(ticketPriceData) : 63;
  });
  const [scanned, setScanned] = useState(false);
  const [savedTrips, setSavedTrips] = useState<{ from: string; to?: string; price: string; scanned: boolean }[]>(() => {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const savedTripsData = localStorage.getItem('savedTrips');
    return savedTripsData ? JSON.parse(savedTripsData) : [];
  });
  const [showAbout, setShowAbout] = useState(false);
  

  useEffect(() => {
    document.title = 'Deutschlandticket Calculator';
  }, []);

  // Save data to localStorage whenever savedTrips or d_ticket_price changes
  useEffect(() => {
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  const handleSubmit = () => {
    if (from && to && price) {
      setSavedTrips([...savedTrips, { from, to, price, scanned }]);
      setFrom('');
      setTo('');
      setPrice('');
      setScanned(false);
    }
  };

  const toggleScanned = (index: number) => {
    const updatedTrips = [...savedTrips];
    updatedTrips[index].scanned = !updatedTrips[index].scanned;
    setSavedTrips(updatedTrips);
  };

  const deleteTrip = (index: number) => {
    setSavedTrips(savedTrips.filter((_, i) => i !== index));
  };

  return (
    <>
      <style>{`
        a, a:visited, a:active {
          color: ${colors.link};
          text-decoration: underline;
        }
        a:hover {
          color: ${colors.link};
        }
      `}</style>
      <ScrollView style={styles.container}>
      <CardView>
        <ThemedText type="title">Deutschlandticket Calculator</ThemedText>
        <ThemedText>
          By <a href="http://columcross.com" target='_blank'>Colum Cross</a>
        </ThemedText>
        <Button 
          onClick={() => setShowAbout(!showAbout)}
          sx={{
            color: colors.link,
            textTransform: 'none',
            padding: 0,
            justifyContent: 'flex-start',
            textDecoration: 'underline',
          }}
        >
          {showAbout ? '...Back' : 'About...'}
        </Button>
      </CardView>

      {!showAbout && (<>

        <CardView>
          <TextField 
            id="ticket_price" 
            label="Price of Deutschlandticket (€)" 
            type="number"
            variant="standard"
            value={d_ticket_price}
            onChange={(e) => {
              const newPrice = parseFloat(e.target.value) || 63;
              setD_ticket_price(newPrice);
              localStorage.setItem('d_ticket_price', newPrice.toString());
            }}
          />
        </CardView>

         {/* Quick Ticket Adds */}
        <CardView>
          <ThemedText type="subtitle">Quick Add:</ThemedText>
          <ThemedView style={{ flexDirection: 'row', gap: 8 }}>
            <QuickTicket name="BVG Full" price={4} onQuickAdd={(trip) => setSavedTrips([...savedTrips, trip])} />
            <QuickTicket name="BVG Short" price={2.80} onQuickAdd={(trip) => setSavedTrips([...savedTrips, trip])} />
          </ThemedView>
        </CardView>

          
          {/* Ticket Section */}
        <CardView>
          <ThemedText type="subtitle">Enter a custom trip:</ThemedText>
          <StationSearchBar 
            id="station_from" 
            label="Origin" 
            value={from}
            onChange={(value) => setFrom(value ?? '')}
          />
          <StationSearchBar 
            id="station_to" 
            label="Destination" 
            value={to}
            onChange={(value) => setTo(value ?? '')}
          />
          <TextField 
            id="price" 
            label="Price" 
            type="number"
            variant="standard"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={scanned} 
                onChange={(e) => setScanned(e.target.checked)}
                icon={<CheckboxIcon checked={false} />}
                checkedIcon={<CheckboxIcon checked={true} />}
              />} 
            label="Ticket was Scanned"
          />
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </CardView>

        {/* Savings Section */}
        <SavingsView savedTrips={savedTrips} ticketPrice={d_ticket_price} />

        <CardView>
          
          {/* Saved trips will appear here  */}
          <ThemedText style={{ marginBottom: 8 }}>Saved Trips:</ThemedText>
          {savedTrips.map((trip, index) => (
            <ThemedView key={index} style={styles.savedTripItem}>
              <ThemedText>
                {trip.from}{trip.to && ` → ${trip.to}`} - {trip.price}€
              </ThemedText>
              <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Checkbox
                  checked={trip.scanned}
                  onChange={() => toggleScanned(index)}
                  icon={<CheckboxIcon checked={false} />}
                  checkedIcon={<CheckboxIcon checked={true} />}
                />
                <Button
                  variant="contained"
                  onClick={() => deleteTrip(index)}
                  color="error"
                  sx={{ minWidth: '40px', padding: '8px' }}
                >
                  X
                </Button>
              </ThemedView>
            </ThemedView>
          ))}
        </CardView>
      </>)}
      {showAbout && (
        <>
          <CardView>
            <ThemedText>This site tallies up the cost of every DB trip you have taken over the month and tells you how much money you saved by having a Deutschlandticket.</ThemedText>
            <ThemedText>This application is being built on the first principles of iterative software development, starting with the most fundemental Minimum Viable Product (MVP) as outlined in the Design of Everyday Things. While there is a roadmap and North Star for this project, it is starting at nothing.</ThemedText>
            <ThemedText>This is version 2.0.5. The application has now been rebuilt in React.</ThemedText>
            <ThemedText>You are able to manually calculate the savings you have generated on your D-Ticket. The fares you enter are saved in your browser. Since this is an essential aspect of the website, and the data does not contain any personal information, the data stored is considered &quot;strictly necessary&quot; and therefore does not require consent under the GDPR and EPD. You can add and remove the fares you enter from the list.</ThemedText>
            <ThemedText>I've added theme switching support. The application now detects whether your system is in light or dark mode and automatically adapts accordingly.</ThemedText>
          </CardView>
        </>
      )}
    </ScrollView>
    </>
  );
}

const CheckboxIcon = ({ checked }: { checked: boolean }) => {
  const colors = useThemeColors();

  if (checked) {
    return <FontAwesomeIcon icon={faTicket} style={{ 
      color: colors.ticketChecked,
      fontSize: '24px',
      backgroundColor: colors.ticketCheckedBg,
      borderRadius: '4px',
      padding: '2px',
      border: `3px solid ${colors.ticketChecked}`,
    }} />;
  } else {
    return <FontAwesomeIcon icon={faTicket} style={{ 
      color: colors.ticketUnchecked,
      fontSize: '24px',
      backgroundColor: colors.background,
      borderRadius: '4px',
      padding: '2px',
      border: '3px solid',
      borderColor: colors.ticketUnchecked,
    }} />;
  }
};
