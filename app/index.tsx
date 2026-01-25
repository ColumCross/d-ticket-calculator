import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

export default function HomeScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState('');
  const [d_ticket_price, setD_ticket_price] = useState('63');
  const [scanned, setScanned] = useState(false);
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [savedTrips, setSavedTrips] = useState<Array<{ from: string; to: string; price: string; scanned: boolean }>>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    document.title = 'Deutschlandticket Calculator';
    const savedTripsData = localStorage.getItem('savedTrips');
    const ticketPriceData = localStorage.getItem('d_ticket_price');
    
    if (savedTripsData) {
      setSavedTrips(JSON.parse(savedTripsData));
    }
    if (ticketPriceData) {
      setD_ticket_price(ticketPriceData);
    }
  }, []);

  // Save data to localStorage whenever savedTrips or d_ticket_price changes
  useEffect(() => {
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    localStorage.setItem('d_ticket_price', d_ticket_price);
  }, [d_ticket_price]);

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

  const calculateTotalSaved = () => {
    const totalPrice = savedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);
    const ticketCost = parseFloat(d_ticket_price) || 63;
    return totalPrice - ticketCost;
  };

  const calculateScannedSaved = () => {
    const scannedTrips = savedTrips.filter(trip => trip.scanned);
    const totalPrice = scannedTrips.reduce((sum, trip) => sum + (parseFloat(trip.price) || 0), 0);
    const ticketCost = parseFloat(d_ticket_price) || 63;
    return totalPrice - ticketCost;
  };


  return (
    <>
      <style>{`
        a, a:visited, a:active {
          color: #99CCFF;
          text-decoration: underline;
        }
        a:hover {
          color: #99CCFF;
        }
      `}</style>
      <ScrollView style={styles.container}>
      <ThemedView style={styles.cardContainer} darkColor={Colors.dark.cardBackground}>
        <ThemedText type="title" darkColor="#ffffff">Deutschlandticket Calculator</ThemedText>
        <ThemedText darkColor="#ffffff">
          By <a href="http://columcross.com" target='_blank'>Colum Cross</a>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardContainer} darkColor={Colors.dark.cardBackground}>
        <ThemedText darkColor="#ffffff">
          This site tallies up the cost of every DB trip you have taken over the month and tells you how much money you saved by having a Deutschlandticket.
        </ThemedText>
        {expandedAbout && (
          <>
            <ThemedText darkColor="#ffffff">
              This application is being built on the first principles of iterative software development, starting with the most fundemental Minimum Viable Product (MVP) as outlined in the Design of Everyday Things. While there is a roadmap and North Star for this project, it is starting at nothing.
            </ThemedText>
            <ThemedText darkColor="#ffffff">
              This is version 2.0.0. The application has now been rebuilt in React. In this version you are able to manually calculate the savings you have generated on your D-Ticket. The fares you enter are saved in your browser. Since this is an essential aspect of the website, and the data does not contain any personal information, the data stored is considered "strictly necessary" and therefore does not require consent under the GDPR and EPD. You can add and remove the fares you enter from the list.
            </ThemedText>
          </>
        )}
        <Button 
          onClick={() => setExpandedAbout(!expandedAbout)}
          sx={linkButtonStyles}
        >
          {expandedAbout ? '...Show less' : 'Show more...'}
        </Button>
      </ThemedView>

      <ThemedView style={styles.cardContainer} darkColor={Colors.dark.cardBackground}>
        <TextField 
          id="ticket_price" 
          label="Price of Deutschlandticket (€)" 
          type="number"
          variant="standard"
          value={d_ticket_price}
          onChange={(e) => setD_ticket_price(e.target.value)}
          sx={textFieldStyles}
        />
      </ThemedView>
        
      <ThemedView style={styles.cardContainer} darkColor={Colors.dark.cardBackground}>
        <TextField 
          id="station_from" 
          label="Origin" 
          variant="standard"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          sx={textFieldStyles}
        />
        <TextField 
          id="station_to" 
          label="Destination" 
          variant="standard"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          sx={textFieldStyles}
        />
        <TextField 
          id="price" 
          label="Price" 
          type="number"
          variant="standard"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={textFieldStyles}
        />
        <FormControlLabel 
          control={
            <Checkbox 
              checked={scanned} 
              onChange={(e) => setScanned(e.target.checked)}
              icon={<CheckboxIcon checked={false} />}
              checkedIcon={<CheckboxIcon checked={true} />}
              sx={checkboxStyles} 
            />} 
          label="Ticket was Scanned"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: 'white',
            },
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </ThemedView>
      <ThemedView style={styles.cardContainer} darkColor={Colors.dark.cardBackground}>
        <ThemedText darkColor="#ffffff" style={{ marginBottom: 8 }}>Savings:</ThemedText>
        <ThemedText darkColor="#ffffff" style={{ marginBottom: 4 }}>
          Total Saved: {calculateTotalSaved().toFixed(2)}€
        </ThemedText>
        <ThemedText darkColor="#ffffff">
          Total Saved on Scanned Trips: {calculateScannedSaved().toFixed(2)}€
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.cardContainer} darkColor={Colors.dark.cardBackground}>
        
        {/* Saved trips will appear here  */}
        <ThemedText darkColor="#ffffff" style={{ marginBottom: 8 }}>Saved Trips:</ThemedText>
        {savedTrips.map((trip, index) => (
          <ThemedView key={index} style={styles.savedTripItem}>
            <ThemedText darkColor="#ffffff">
              {trip.from} → {trip.to} - {trip.price}€
            </ThemedText>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Checkbox
                checked={trip.scanned}
                onChange={() => toggleScanned(index)}
                icon={<CheckboxIcon checked={false} />}
                checkedIcon={<CheckboxIcon checked={true} />}
                sx={checkboxStyles}
              />
              <Button
                variant="contained"
                onClick={() => deleteTrip(index)}
                sx={{
                  backgroundColor: '#ff0000',
                  color: 'white',
                  minWidth: '40px',
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: '#cc0000',
                  },
                }}
              >
                X
              </Button>
            </ThemedView>
          </ThemedView>
        ))}
        
      </ThemedView>
    </ScrollView>
    </>
  );
}

const textFieldStyles = {
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInputBase-formLabel': {
    color: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
};

const checkboxStyles = {
  color: 'white',
  '&.Mui-checked': {
    color: 'white',
  },
  '& .MuiCheckbox-root': {
    padding: 0,
  },
};

const CheckboxIcon = ({ checked }: { checked: boolean }) => {
  if (checked) {
    return <FontAwesomeIcon icon={faTicket} style={{ 
      color: '#006005', 
      fontSize: '24px',
      backgroundColor: '#00BF0C',
      borderRadius: '4px',
      padding: '2px',
      border: '3px solid #006005' 
    }} />;
  } else {
    return <FontAwesomeIcon icon={faTicket} style={{ 
      color: Colors.dark.cardBackground, 
      fontSize: '24px',
      backgroundColor: Colors.dark.background,
      borderRadius: '4px',
      padding: '2px',
      border: '3px solid',
      borderColor: Colors.dark.cardBackground
    }} />;
  }
};

const linkButtonStyles = { 
  color: '#99CCFF', 
  textTransform: 'none', 
  padding: 0, 
  justifyContent: 'flex-start',
  textDecoration: 'underline'
};

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


/*

//import 'db-prices';
//import 'db-stations-autocomplete';
import { useState } from "react";
import { Text, View } from "react-native";

// for (const station of ReadableStations()) {
//  	console.log(station);
// }

export default function Index() {

  const [globalVariable, setGlobalVariable] = useState<String>("Hello World");


  //var globalVariable = "Hello World";

  const buttonTest = () => {
    console.log("Button clicked new");
    setGlobalVariable(globalVariable + " new");
    console.log(globalVariable);
    
    /*
    const prices = require('db-prices')
    prices('8000105', '8011160').then(
      (prices: any) => {
        console.log(prices);
      }
    ).catch(
      (error: any) => {
        console.log(error);
      }
    )
    *

  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <h1>Hello World</h1>
      <p>{globalVariable}</p>
      <p>This is a test</p>
      <button onClick={buttonTest}>Click me</button>
      <input type="text" placeholder="Enter your name" />
      <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </View>
  );
}

*/
