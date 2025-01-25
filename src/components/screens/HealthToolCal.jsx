import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../../assets/styles/HealthToolCal.css';

const HealthCalculator = () => {
  const [bmi, setBmi] = useState(null);
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiMessage, setBmiMessage] = useState('');

  const [bpSystolic, setBpSystolic] = useState('');
  const [bpDiastolic, setBpDiastolic] = useState('');
  const [bpMessage, setBpMessage] = useState('');

  const [heartRate, setHeartRate] = useState('');
  const [heartRateZones, setHeartRateZones] = useState('');

  // BMI Calculator Function
  const calculateBmi = () => {
    const heightInMeters = bmiHeight / 100;
    const calculatedBmi = (bmiWeight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(calculatedBmi);

    if (calculatedBmi < 18.5) setBmiMessage('Underweight');
    else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) setBmiMessage('Normal weight');
    else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) setBmiMessage('Overweight');
    else setBmiMessage('Obese');
  };

  // Blood Pressure Category
  const calculateBloodPressure = () => {
    if (bpSystolic < 120 && bpDiastolic < 80) setBpMessage('Normal');
    else if (bpSystolic >= 120 && bpSystolic <= 129 && bpDiastolic < 80) setBpMessage('Elevated');
    else if (bpSystolic >= 130 || bpDiastolic >= 80) setBpMessage('High Blood Pressure');
  };

  // Heart Rate Zones Calculation
  const calculateHeartRateZone = () => {
    const maxHeartRate = 220 - heartRate;
    const zone1 = Math.round(maxHeartRate * 0.5);
    const zone2 = Math.round(maxHeartRate * 0.6);
    const zone3 = Math.round(maxHeartRate * 0.7);
    setHeartRateZones(`Zone 1: ${zone1}-${zone2} bpm, Zone 2: ${zone2}-${zone3} bpm`);
  };

  return (
    <Container className="health-tool-container mt-5">
      <h2 className="health-tool-title text-center mb-4">Health Calculators</h2>
      <Row>
        {/* BMI Calculator */}
        <Col md={4} sm={12} className="health-tool-section mb-4">
          <Card className="health-tool-card p-3 shadow-sm">
            <Card.Body>
              <Card.Title className="health-tool-card-title">BMI Calculator</Card.Title>
              <Form>
                <Form.Group controlId="bmiHeight">
                  <Form.Label className="health-tool-label">Height (cm)</Form.Label>
                  <Form.Control
                    className="health-tool-input"
                    type="number"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    placeholder="Enter height in cm"
                  />
                </Form.Group>
                <Form.Group controlId="bmiWeight" className="mt-3">
                  <Form.Label className="health-tool-label">Weight (kg)</Form.Label>
                  <Form.Control
                    className="health-tool-input"
                    type="number"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    placeholder="Enter weight in kg"
                  />
                </Form.Group>
                <Button
                  className="health-tool-button mt-3"
                  variant="primary"
                  onClick={calculateBmi}
                >
                  Calculate BMI
                </Button>
              </Form>
              {bmi && (
                <Alert className="health-tool-alert mt-3" variant="info">
                  BMI: {bmi} - {bmiMessage}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Blood Pressure Calculator */}
        <Col md={4} sm={12} className="health-tool-section mb-4">
          <Card className="health-tool-card p-3 shadow-sm">
            <Card.Body>
              <Card.Title className="health-tool-card-title">Blood Pressure Calculator</Card.Title>
              <Form>
                <Form.Group controlId="bpSystolic">
                  <Form.Label className="health-tool-label">Systolic (mmHg)</Form.Label>
                  <Form.Control
                    className="health-tool-input"
                    type="number"
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(e.target.value)}
                    placeholder="Enter systolic pressure"
                  />
                </Form.Group>
                <Form.Group controlId="bpDiastolic" className="mt-3">
                  <Form.Label className="health-tool-label">Diastolic (mmHg)</Form.Label>
                  <Form.Control
                    className="health-tool-input"
                    type="number"
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(e.target.value)}
                    placeholder="Enter diastolic pressure"
                  />
                </Form.Group>
                <Button
                  className="health-tool-button mt-3"
                  variant="primary"
                  onClick={calculateBloodPressure}
                >
                  Check Blood Pressure
                </Button>
              </Form>
              {bpMessage && (
                <Alert className="health-tool-alert mt-3" variant="info">
                  Blood Pressure Category: {bpMessage}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Heart Rate Zone Calculator */}
        <Col md={4} sm={12} className="health-tool-section mb-4">
          <Card className="health-tool-card p-3 shadow-sm">
            <Card.Body>
              <Card.Title className="health-tool-card-title">
                Heart Rate Zones Calculator
              </Card.Title>
              <Form>
                <Form.Group controlId="heartRate">
                  <Form.Label className="health-tool-label">Age (years)</Form.Label>
                  <Form.Control
                    className="health-tool-input"
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    placeholder="Enter your age"
                  />
                </Form.Group>
                <Button
                  className="health-tool-button mt-3"
                  variant="primary"
                  onClick={calculateHeartRateZone}
                >
                  Calculate Heart Rate Zones
                </Button>
              </Form>
              {heartRateZones && (
                <Alert className="health-tool-alert mt-3" variant="info">
                  {heartRateZones}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthCalculator;
