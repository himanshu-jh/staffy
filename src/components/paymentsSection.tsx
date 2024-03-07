// Imports
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { format, setDate } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { FunctionComponent, useEffect, useState } from "react"
import React from "react"
import { toast } from "./ui/use-toast"

// Transaction Fields and Unique ID

const generateUniqueTransactionId = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `TXN-${randomString}`;
  };
  
  // Update the custom FormData type
  type TransactionFormData = {
    employee_id: string;
    txn_id: string;
    date: string;
    type: string;
    amount: number | null;
    notes: string;
  };

// Update the initialFormData and the useState calls
const initialFormData: TransactionFormData = {
    employee_id: '',
    txn_id: generateUniqueTransactionId(),
    date: new Date().toLocaleDateString(),
    type: '',
    amount: null,
    notes: '',
  };
// Props
 
const todayDateString = new Date().toISOString().split('T')[0];
 
type PaymentTabProps = {
    apiUrl: string; // Add more props as needed
  };

  const PaymentTab: React.FC<PaymentTabProps> = ({ apiUrl }) => {
    const [date, setDate] = useState<Date>()
    // const [userEnteredDate, setUserEnteredDate] = useState(todayDateString);
    const [paymentFormData, setPaymentFormData] = useState(initialFormData);
    const [receiveFormData, setReceiveFormData] = useState(initialFormData);

    const [apiError, setApiError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const [selectedTab, setSelectedTab] = useState('makePayment')
  
    const handleMakePayment = async () => {
      try {
        setIsLoading(true);
  
        // Determine which form data to use based on the selected tab
        const formData = selectedTab === 'makePayment' ? paymentFormData : receiveFormData;
  
        // Ensure that the formData includes the userEnteredDate
        const formDataWithDate = { ...formData, date: date };
  
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithDate),
        });
  
        if (response.ok) {
          console.log('Transaction updated successfully');
          // You can perform additional actions or update state as needed
          return toast({
            title: "Transaction Updated",
            description: "Transaction updated successfully",
          })
        } else {
          // Handle non-successful responses
          const errorText = await response.text();
          
          setApiError(`Failed to update transaction: ${errorText}`);
          return toast({
            title: "Transaction Failed",
            description: "Transaction failed, please try again",
          })
        }
      } catch (error) {
        console.error('Error during API call:', error);
        setApiError('Error during API call');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleInputChange = (field: string, value: string) => {
      if (selectedTab === 'makePayment') {
        setPaymentFormData((prevData: any) => ({
          ...prevData,
          [field]: value,
        }));
      } else {
        setReceiveFormData((prevData: any) => ({
          ...prevData,
          [field]: value,
        }));
      }
    };
  
    useEffect(() => {
      // Set the initial value of "type" to "Paid" when the component mounts
      setPaymentFormData((prevData: any) => ({
        ...prevData,
        type: 'Paid',
      }));
    }, [setPaymentFormData]);
  
    useEffect(() => {
      // Set the initial value of "type" to "Received" when the component mounts
      setReceiveFormData((prevData: any) => ({
        ...prevData,
        type: 'Received',
      }));
    }, [setReceiveFormData]);
 
 // JSX
  return (
    <Tabs defaultValue="makepmt" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="makepmt">Make Payment</TabsTrigger>
        <TabsTrigger value="rcvpmt">Receive Payment</TabsTrigger>
      </TabsList>
      <TabsContent value="makepmt">
        <Card>
          <CardHeader>
            <CardTitle>Make Payment</CardTitle>
            <CardDescription>
              {/* Any description here */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="date">Date</Label>
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        onClick={() => setSelectedTab('makePayment')
                      }
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    />
                </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-1">
              <Label htmlFor="amount">Paid Amount</Label>
              <Input 
              id="amount" 
              type="number" 
              placeholder="Enter paid amount"
              onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </div>
            
          </CardContent>
          <CardFooter>
            <Button onClick={handleMakePayment}>Make Payment</Button>
            
          </CardFooter>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Input 
              className="space-y-2"
              id="notes" 
              placeholder="Enter any notes here.." 
              onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
            </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="rcvpmt">
        <Card>
          <CardHeader>
            <CardTitle>Receive Payment</CardTitle>
            <CardDescription>
              {/* Any description here */}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="rcvpmt">Date</Label>
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        onClick={() => setSelectedTab('receivePayment')}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    />
                </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-1">
              <Label htmlFor="rcvpmt">Received Amount</Label>
              <Input 
              id="abc" 
              type="number"
              placeholder="Enter received amount"
              onChange={(e) => handleInputChange('amount', e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleMakePayment}>Receive Payment</Button>
          </CardFooter>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Input 
              className="space-y-2"
              id="notes" 
              placeholder="Enter any notes here.." 
              onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default PaymentTab;