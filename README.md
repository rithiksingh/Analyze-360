# 🔍 Analyze-360

**Analyze-360** is an AI-powered, full-stack due diligence tool for deep company research. It features modular research pipelines, real-time WebSocket updates, Markdown → PDF report generation, and optional MongoDB persistence.

---

## 🚀 Features

- 🔗 **Modular Research Pipeline**  
  Research nodes: Company Overview, Industry Analysis, Financial Summary, News Aggregation

- 📡 **Real-Time WebSocket Updates**  
  Live feedback from each research step

- 📄 **Markdown to PDF Report Generation**

- 🧠 **AI-Powered Engine**  
  Powered by OpenAI GPT (default), Tavily, and Google Gemini (configurable)

- 💾 **Optional MongoDB Persistence**  
  Store job metadata, intermediate outputs, and final reports

---

## 🧱 Tech Stack

- **Backend**: FastAPI, Uvicorn, Python, Pydantic  
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Lucide Icons  
- **AI Providers**: OpenAI, Tavily API, Google Gemini  
- **Docs**: Swagger UI at `/docs`

---

## 📂 Project Structure

Analyze-360/
├── application.py # FastAPI entrypoint
├── backend/
│ ├── graph.py # Research graph builder/executor
│ ├── nodes/ # Modular researcher logic
│ ├── utils/ # Markdown → PDF utilities
│ └── services/ # WebSocket, MongoDB, PDF services
├── reports/ # Generated PDFs (gitignored)
├── ui/ # React frontend
│ ├── src/ # Components & logic
│ ├── public/ # Static assets
│ └── package.json # Frontend config
├── langgraph.json # Node configs & DAG structure
├── langgraph_entry.py # CLI-based execution
├── requirements.txt # Python dependencies
├── setup.sh # Setup script
├── .env.example # Backend env template
├── ui/.env.example # Frontend env template
├── demo/
│ └── Analyze-360-demo.mp4
└── README.md

yaml
Copy
Edit

---

## ⚙️ Prerequisites

- Python 3.9+
- Node.js 16+
- MongoDB *(optional)*

---

## 🛠️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/rithiksingh/Analyze-360.git
cd Analyze-360
2. Backend Setup
bash
Copy
Edit
python3 -m venv .venv
source .venv/bin/activate       # macOS/Linux
# .\.venv\Scripts\activate      # Windows
Install dependencies:

bash
Copy
Edit
pip install --upgrade pip
pip install -r requirements.txt
Configure environment variables:

env
Copy
Edit
# .env
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname
Start the backend server:

bash
Copy
Edit
uvicorn application:app --reload --port 8000
API Docs: http://localhost:8000/docs

WebSocket: ws://localhost:8000/ws/status

3. Frontend Setup
bash
Copy
Edit
cd ui
npm install
Configure environment variables:

env
Copy
Edit
# ui/.env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/status
Run the frontend dev server:

bash
Copy
Edit
npm run dev
Visit: http://localhost:5173

🚦 Usage
Open the UI and input a company name or ticker.

Click Start Research.

Watch real-time status updates.

View the Markdown report.

Click Download PDF to save the final output.

🧩 Architecture Overview
Research Graph:
Directed acyclic graph defined in langgraph.json and executed in backend/graph.py.

WebSocketService:
Sends live node updates with timestamps.

PDFService:
Converts compiled Markdown to a styled PDF at reports/{job_id}.pdf.

MongoDBService (Optional):
Stores metadata, intermediate outputs, and final reports.

React Frontend:
Submits jobs, subscribes to WebSocket, shows progress, and renders Markdown.

🏅 Bonus Features
✅ Live Node Status
Real-time updates via /ws/status

✅ Historical Job Lookup
Enabled by MongoDB (optional)

✅ One-Click PDF Export
POST to /research/{job_id}/generate-pdf

✅ Error Handling
Logs errors and displays fallback messages in the frontend

✅ Scalable Design
Add/remove research steps by editing langgraph.json

✅ Security Focus

API keys in .env files

CORS-restricted endpoints

Input validation using Pydantic

✅ Modern UX

Responsive Tailwind UI

Dark/Light mode

Collapsible node panels

Integrated LLM conversation history

🤝 Contributing
bash
Copy
Edit
# Fork the repo
git checkout -b feature/YourFeature

# Make your changes
git add .
git commit -m "Add: your feature"

# Push and create a PR
git push origin feature/YourFeature
📚 References
OpenAI

Tavily API

Google Gemini

📬 Contact
Author: Rithik Singh
📧 Email: Hrithiksingh.hst@gmail.com