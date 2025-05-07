// vendor
import axios from 'axios';

// lib
import { addUsage } from './usageTracker';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY; // O usa process.env si estás en un backend
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const sendMessageToAI = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await axios.post(
      OPENROUTER_BASE_URL,
      {
        // model: 'mistral/mistral-7b-instruct:free', // modelo gratuito recomendado
        model: 'openai/gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Monitoreo del consumo (estimado, ya que OpenRouter no devuelve el costo exacto)
    const usage = response.data.usage;
    console.log('🧾 Uso de tokens:', usage);
    // Aquí podrías agregar un contador global, log local o almacenamiento en IndexedDB
    const estimatedCost = 0.002; // 0.002 USD por interacción
    addUsage(estimatedCost);

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('❌ Error al llamar a OpenRouter:', error.response?.data || error.message);
    throw new Error('Error al comunicarse con el modelo de IA');
  }
};
