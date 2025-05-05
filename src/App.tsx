// vendor
import { Button, Card, Col, Layout, Row, Typography, Upload } from 'antd';

// styles
import './App.css';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

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

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Title level={2}>💸 iGastos</Title>
        <Text type="secondary">¡Ay gastos, ya los vi venir!</Text>
      </Header>
      <Content style={contentStyle}>
        <Card>
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Subir archivo PDF</Button>
          </Upload>
        </Card>

        {/* Resultados simulados */}
        <Row gutter={16} style={{ marginTop: 32 }}>
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
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Button type="primary">Analizar otro PDF</Button>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
