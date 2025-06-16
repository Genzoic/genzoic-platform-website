
// Google Sheets integration utility
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzI0VNqNwlGOLQNW9vXEhvimRe41HYyejp4BXyq-AHBr5KKYvhCA8IwRxY6WtsQRqgE/exec';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const submitToGoogleSheets = async (data: any, formType: string = 'general'): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Submitting to Google Sheets with form type:', formType);
    console.log('Data being submitted:', data);
    
    // Create FormData to avoid CORS issues with Google Apps Script
    const formData = new FormData();
    
    // Add form type first (important for routing in Apps Script)
    formData.append('formType', formType);
    
    // Add timestamp
    formData.append('timestamp', new Date().toISOString());
    
    // Add all data fields dynamically
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        const value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : String(data[key]);
        formData.append(key, value);
        console.log(`Adding field: ${key} = ${value}`);
      }
    });
    
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // This prevents CORS errors
      body: formData
    });
    
    console.log('Google Sheets response status:', response.status);
    
    // Since we're using no-cors mode, we can't read the response
    // but we assume success if no error was thrown
    return {
      success: true,
      message: 'Form submitted successfully! We will get back to you soon.'
    };
    
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return {
      success: false,
      message: 'There was an error submitting the form. Please try again.'
    };
  }
};
