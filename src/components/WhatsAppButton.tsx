import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = "7062903523"; // Replace with actual number
  const message = "Hello! I'm interested in your auto parts.\n\nView our catalog: http://res.cloudinary.com/dfl3ehbuu/image/upload/v1697864735/nwcwpwcrjkuwlqqpkgnv.jpg";
  
const handleClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}