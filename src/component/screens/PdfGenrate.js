import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CHeader from '../common/CHeader';
import {Field, Formik} from 'formik';
import {productPurchaseValidationSchema} from '../../utils/validation';
import CustomeInput from '../common/CInput';
import CButton from '../common/CButton';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {errorToast, sucessToast} from '../common/CToast';

export default function PdfGenrate() {
  const formikRef = useRef(null);
  const [pdfPath, setPdfPath] = useState(null);

  const onSubmitForm = async values => {
    console.log(values);
    const generatedPdfPath = await generatePDF(values);
    await savePDFToStorage(generatedPdfPath);
  };

  const generatePDF = async formData => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              text-align: center;
            }
            .content {
              margin-bottom: 20px;
              font-size: 24px;
            }
          </style>
        </head>
        <body>
          <div class="header"><h3>Product Purchase Information</h3></div>
          <div class="content">Full Name: ${formData.fullName}</div>
          <div class="content">Email: ${formData.email}</div>
          <div class="content">Phone Number: ${formData.phoneNumber}</div>
          <div class="content">Product Name: ${formData.productName}</div>
          <div class="content">Quantity: ${formData.quantity}</div>
          <div class="content">Rate: ${formData.rate}</div>
        </body>
      </html>
    `;

    const options = {
      html: htmlContent,
      fileName: 'example',
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    return file.filePath;
  };

  const savePDFToStorage = async pdfPath => {
    try {
      const destPath = `${RNFS.DownloadDirectoryPath}/example.pdf`;
      await RNFS.copyFile(pdfPath, destPath);
      sucessToast('PDF Downloaded', `PDF saved to: ${destPath}`);
      setPdfPath(destPath);
    } catch (error) {
      console.log(error);
      errorToast('Error', 'Failed to save PDF to storage');
    }
  };

  return (
    <View style={styles.main}>
      <CHeader title={'Pdf Genrate'} isBack />
      <View style={styles.innerview}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            fullName: '',
            email: '',
            phoneNumber: '',
            productName: '',
            quantity: '',
            rate: '',
          }}
          validationSchema={productPurchaseValidationSchema}
          onSubmit={(values, {resetForm}) => {
            onSubmitForm(values);
            resetForm();
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomeInput}
                name="fullName"
                placeholder="Full Name"
              />
              <Field
                component={CustomeInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={CustomeInput}
                name="phoneNumber"
                placeholder="Phone Number"
                keyboardType="numeric"
              />
              <Field
                component={CustomeInput}
                name="productName"
                placeholder="Product Name"
              />
              <Field
                component={CustomeInput}
                name="quantity"
                placeholder="Quantity"
                keyboardType="numeric"
              />
              <Field
                component={CustomeInput}
                name="rate"
                placeholder="Rate"
                keyboardType="numeric"
              />
              <CButton
                title={'Generate PDF'}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
