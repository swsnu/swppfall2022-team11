import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  
export const MyDocument = (props: { text: string }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{props.text}</Text>
        </View>
      </Page>
    </Document>
  );