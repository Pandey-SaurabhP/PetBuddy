import { useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const response = await axios.post("http://localhost:3001/api/message", {
        prompt: input,
      });
      setMessage(response.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessage("Error fetching response.");
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Chat Toggle Button */}
      <button
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-72 bg-white shadow-xl rounded-lg p-4 flex flex-col space-y-2 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Chatbot</h2>
          <div className="border p-2 h-32 overflow-y-auto text-gray-600 bg-gray-50 rounded">
            {message || "Awaiting response..."}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            className="border p-2 rounded w-full text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
