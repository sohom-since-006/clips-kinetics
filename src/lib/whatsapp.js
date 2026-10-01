import { siteConfig } from '../data/site';

/**
 * Builds a direct WhatsApp chat link with an optional pre-filled message.
 * Phone number is stored as pure digits in site.js.
 * 
 * @param {string} [message] - Custom message to pre-fill in WhatsApp
 * @returns {string} Fully encoded WhatsApp URL
 */
export function getWhatsAppUrl(message) {
  const defaultMessage = "Hi Sohom, I came across your Clips Kinetics portfolio and would like to discuss a video editing project!";
  const textToSend = message || siteConfig.whatsappDefaultMessage || defaultMessage;
  
  // Ensure phone has only digits
  const cleanPhone = siteConfig.phone.replace(/\D/g, '');
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToSend)}`;
}
