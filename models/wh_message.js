import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const whMessage = repository('wh_message');


export const create = async (data) => {
  
};

export const getChatHistory = async (order_id) => {
  try {
    const chatHistory = await db('wh_message')
      .select(
        'id',
        'order_id',
        'type as message_type',
        'type_message as message_type_message',
        'id_message',
        'timestamp as message_timestamp',
        'message_data',
        'status as message_status',
        'sender_id'
      )
      .where('order_id', order_id)
      .orderBy('timestamp', 'asc'); 

    return chatHistory;
  } catch (err) {
    console.error('Error fetching chat history:', err);
    throw new Error('Failed to fetch chat history.');
  }
};

