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

function App() {
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
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Subir archivo PDF</Button>
              </Upload>
            </Card>
          </Col>
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
