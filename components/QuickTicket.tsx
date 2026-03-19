import Button from '@mui/material/Button';

interface QuickTicketProps {
    name: string;
    price: number;
    onQuickAdd: (trip: { from: string; to?: string; price: string; scanned: boolean }) => void;
}

export default function QuickTicket({name, price, onQuickAdd}: QuickTicketProps) {
    const quickAdd = () => {
        onQuickAdd({
             from: name,
            to: undefined,
            price: price.toFixed(2).toString(),
            scanned: false
        });
    };
    
    return (
        <Button variant="contained" color="primary" sx={{ width: '50%' }} onClick={quickAdd}>
            {name} ({price.toFixed(2)}€)
        </Button>
    );
}