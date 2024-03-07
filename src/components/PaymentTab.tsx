import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './PaymentTab.module.css';

interface PaymentTabProps {
  selectedTab: string;
  receiveFormData: any; // Change the type as per your actual data structure
  setReceiveFormData: React.Dispatch<React.SetStateAction<any>>; // Change the type as per your actual data structure
  paymentFormData: any; // Change the type as per your actual data structure
  setPaymentFormData: React.Dispatch<React.SetStateAction<any>>; // Change the type as per your actual data structure
  userEnteredDate: string;
  setUserEnteredDate: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentTab: FunctionComponent<PaymentTabProps> = ({
  selectedTab,
  receiveFormData,
  setReceiveFormData,
  paymentFormData,
  setPaymentFormData,
  userEnteredDate,
  setUserEnteredDate,
}) => {
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setUserEnteredDate(newDate);
  };

  const handleMakePayment = async () => {
    try {
      setIsLoading(true);

      const apiUrl = 'http://localhost:5100/api/transactions/';

      // Determine which form data to use based on the selected tab
      const formData = selectedTab === 'makePayment' ? paymentFormData : receiveFormData;

      // Ensure that the formData includes the userEnteredDate
      const formDataWithDate = { ...formData, date: userEnteredDate };

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
      } else {
        // Handle non-successful responses
        const errorText = await response.text();
        setApiError(`Failed to update transaction: ${errorText}`);
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

  const handleTabClick = (tab: string) => {
    // Pass the selected tab to the parent component (if needed)
  };

  return (
    <div className={styles.tabsAndContent}>
       <div className={styles.tabs}>
        <button className={styles.tabItem} onClick={() => handleTabClick('makePayment')}>
          <div className={selectedTab === 'makePayment' ? styles.selected : styles.unselected}>
            Make Payment
          </div>
        </button>
        <button className={styles.tabItem1} onClick={() => handleTabClick('receivePayment')}>
          <div className={selectedTab === 'receivePayment' ? styles.selected : styles.unselected}>
            Receive Payment
          </div>
        </button>
      </div>
      <div className={styles.tabCard}>
        {/* Content based on the selected tab */}
        {selectedTab === 'makePayment' && (
          <div className={styles.makeChangesToYourAccountHParent}>
            <div className={styles.inputParent}>
              <div className={styles.input}>
                <div className={styles.date}>Payment Date</div>
                <div className={styles.inputwithButton}>
                  <input
                    className={styles.default}
                    placeholder="Date"
                    type="date"
                    value={userEnteredDate}
                    onChange={handleDateInputChange}
                  />
                </div>
              </div>
              <div className={styles.input1}>
                <div className={styles.date}>Payment Amount</div>
                <div className={styles.inputwithButton}>
                <input
                  className={styles.default}
                  placeholder="Enter payment amount here"
                  type="number"
                  value={
                    paymentFormData &&
                    paymentFormData.amount !== undefined &&
                    paymentFormData.amount !== null
                      ? paymentFormData.amount.toString()
                      : ''
                  }
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                />
                </div>
              </div>
            </div>
            <div className={styles.button2}>
              <button className={styles.button2} onClick={handleMakePayment} disabled={isLoading}>
                <b className={styles.makePayment}>{isLoading ? 'Making Payment...' : 'Make Payment'}</b>
              </button>
            </div>
            <div className={styles.input1}>
              <input
                className={styles.inputwithButton2}
                placeholder="Add any notes here"
                type="text"
              />
            </div>
          </div>
        )}
        {selectedTab === 'receivePayment' && (
          <div className={styles.makeChangesToYourAccountHParent}>
            <div className={styles.inputParent}>
              <div className={styles.input}>
                <div className={styles.date}>Received Date</div>
                <div className={styles.inputwithButton}>
                  <input
                    className={styles.default}
                    placeholder="Received Date"
                    type="date"
                    value={userEnteredDate}
                    onChange={handleDateInputChange}
                  />
                </div>
              </div>
              <div className={styles.input1}>
                <div className={styles.date}>Received Amount</div>
                <div className={styles.inputwithButton}>
                  <input
                    className={styles.default}
                    placeholder="Enter received amount here"
                    type="number"
                    value={receiveFormData.amount !== null ? receiveFormData.amount.toString() : ''}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.buttonx2}>
              <button className={styles.buttonx2} onClick={handleMakePayment} disabled={isLoading}>
                <b className={styles.makePayment}>{isLoading ? 'Receiving Payment...' : 'Receive Payment'}</b>
              </button>
            </div>
            <div className={styles.input1}>
              <input
                className={styles.inputwithButton2}
                placeholder="Add any notes here"
                type="text"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTab;
