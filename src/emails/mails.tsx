import * as React from 'react';

import { Button } from "@/components/ui/button";
import { Html, Heading, Text, Container, Section } from "@react-email/components";
import LocationComponent from "@react"

export default function EmergencyAlertEmail() {
  return (
    <Html>
      <Container style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
          {/* Emergency Heading */}
          <Heading as="h1" style={{ fontFamily: 'sans-serif', color: '#dc3545' }}>
            Emergency Alert
          </Heading>
        </Section>

        <Section style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba' }}>
          <Text style={{ fontFamily: 'sans-serif', color: '#856404', marginBottom: '20px' }}>
            Dear Supervisor,
          </Text>
          <Text style={{ fontFamily: 'sans-serif', color: '#856404', marginBottom: '20px' }}>
            This is an urgent alert regarding the safety of <strong>Valued Employee</strong>. The employee is currently located at <strong>Building A, 3rd Floor</strong> and may be in immediate danger. Please take the necessary action immediately.
          </Text>

          <Text style={{ fontFamily: 'sans-serif', color: '#856404', marginBottom: '20px' }}>
            You can contact the employee directly at <strong>123-456-7890</strong>.
          </Text>
        </Section>

        {/* Action buttons */}
        <Section style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            href="tel:1234567890" // Quick call button to the employee
            style={{
              fontFamily: 'sans-serif',
              background: '#007bff',
              color: 'white',
              padding: '12px 20px',
              marginRight: '10px',
            }}
          >
            Call Employee
          </Button>

          <Button
            href="tel:911" // Call authorities button
            style={{
              fontFamily: 'sans-serif',
              background: '#dc3545',
              color: 'white',
              padding: '12px 20px',
            }}
          >
            Call Authorities
          </Button>
        </Section>
      </Container>
    </Html>
  );
}