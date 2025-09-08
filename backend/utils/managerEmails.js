import { collections } from '../db.js';

export const getManagerEmails = async () => {
  try {
    const managers = await collections.user().find({ role: 'manager' }).toArray();
    
    
    if (managers && managers.length > 0) {
      return managers.map(manager => manager.email).filter(email => email);
    }
    return []; 
  } catch (error) {
    console.error('Error fetching manager emails:', error);
    return [];
  }
};