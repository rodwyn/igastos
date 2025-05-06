// vendor
import { Button, Card, Col, Layout, message, Row, Typography, Upload } from 'antd';

// lib
import { extractTextFromPDF } from './lib/pdfParser';

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
  const [pdfText, setPdfText] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpload = async (file: File) => {
    try {
      const text = await extractTextFromPDF(file);
      console.log('🚀 ~ handleUpload ~ text:', text);
      setPdfText(text);
      messageApi.success('PDF cargado y leído con éxito');
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
          {pdfText && (
            <Card title="📄 Texto extraído del PDF">
              <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{pdfText}</Paragraph>
            </Card>
          )}
          <Col span={24}></Col>
          <Col span={12}>
            <Card title="💰 Gasto hormiga">
              <p>Café: $30</p>
              <p>Snacks: $50</p>
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
