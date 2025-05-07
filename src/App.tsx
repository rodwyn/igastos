// vendor
import { Alert, Button, Card, Col, Layout, message, Row, Skeleton, Typography, Upload } from 'antd';

// lib
import { getUsage } from './lib/usageTracker';
import { extractTextFromPDF } from './lib/pdfParser';
import { sendMessageToAI } from './lib/openRouterClient';

// styles
import './App.css';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Header, Footer, Content } = Layout;
const { Paragraph, Title, Text } = Typography;

const headerStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  height: 'auto',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
};

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const usageLimit = 0.5; // USD
  const usage = getUsage();
  const showWarning = usage >= usageLimit * 0.8; // alerta al 80%

  const handleAIAnalysis = async (pdfText: string): Promise<string> => {
    setIsLoading(true); // Inicia el loading
    const messages = [
      {
        role: 'system',
        content:
          'Eres un asesor financiero que analiza gastos personales a partir de texto extraído de estados de cuenta.',
      },
      {
        role: 'user',
        content: `Aquí está el texto extraído de mi PDF:\n\n${pdfText}\n\n¿Qué gastos innecesarios encuentras y qué recomendaciones me das?`,
      },
    ];
    console.log('🚀 ~ handleAIAnalysis ~ messages:', messages);

    try {
      const response = await sendMessageToAI(messages);
      setIsLoading(false); // Detiene el loading
      return response; // 👈 devolvemos la respuesta para que quien lo llame pueda usarla
    } catch (err) {
      setIsLoading(false); // Detiene el loading
      console.error('Error al comunicarse con la IA:', err);
      return 'Error al generar recomendaciones.';
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const text = await extractTextFromPDF(file);
      messageApi.success('PDF cargado y leído con éxito');

      const aiResult = await handleAIAnalysis(text);
      setAiResponse(aiResult);
    } catch (err) {
      messageApi.error('Error al procesar el PDF');
    }

    return false; // evita carga automática
  };

  return (
    <Layout className="mainLayout">
      <Header style={headerStyle}>
        <Title level={2}>💸 iGastos</Title>
        <Text type="secondary">¡Ay gastos, ya los vi venir!</Text>
      </Header>
      {showWarning && (
        <Alert
          message="⚠️ ¡Estás cerca de alcanzar tu límite gratuito!"
          description={`Has consumido $${usage.toFixed(3)} de los $${usageLimit.toFixed(2)} disponibles.`}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Content style={contentStyle}>
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Card>
              <Upload beforeUpload={handleUpload} maxCount={1}>
                <Button icon={<UploadOutlined />}>Subir archivo PDF</Button>
              </Upload>
            </Card>
          </Col>
          {contextHolder}
          <Col span={24}></Col>
          <Col span={12}>
            {/* <Card title="💰 Gasto hormiga">
              <p>Café: $30</p>
              <p>Snacks: $50</p>
            </Card> */}
            {/* {aiResponse && (
              <Card title="🤖 Análisis de gastos con IA">
                <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{aiResponse}</Paragraph>
              </Card>
            )} */}
            <Card title="🤖 Análisis de gastos con IA">
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : (
                <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                  {aiResponse || 'Esperando análisis...'}
                </Paragraph>
              )}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="📊 Gráfico (simulado)">
              <p>[Aquí irá el gráfico de gastos]</p>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={footerStyle}>
        <Button type="primary">Analizar otro PDF</Button>
      </Footer>
    </Layout>
  );
}

export default App;
