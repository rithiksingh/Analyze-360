🔍 Analyze-360
Analyze-360 is an AI-powered, full-stack due diligence tool designed for seamless company research. It features a modular research graph, real-time status tracking via WebSockets, Markdown-to-PDF reporting, and optional MongoDB persistence for historical traceability.

🚀 Features
🔗 Modular Research Pipeline
Customizable graph of intelligent nodes:
Company Overview • Industry Trends • Financial Summary • News Aggregation

📡 Real-Time Status Updates
Live WebSocket feed tracks progress across research stages.

📝 Markdown → 📄 PDF Reports
Beautiful, downloadable reports generated from Markdown.

🧠 AI-Powered Engine
Powered by OpenAI GPT, Tavily, and Google Gemini (configurable per project).

💾 MongoDB Persistence (Optional)
Retain job metadata, node outputs, and reports across sessions.

🧱 Tech Stack
🔧 Backend
FastAPI, Uvicorn, Python, Pydantic

💻 Frontend
React, Vite, TypeScript, Tailwind CSS, Lucide Icons

🤖 AI Models
OpenAI GPT (default)

Tavily API

Google Gemini

📚 Docs
Swagger UI available at: /docs

📂 Project Structure
bash
Copy
Edit
Analyze-360/
├── application.py         # FastAPI entrypoint
├── backend/
│   ├── graph.py           # Research graph builder/executor
│   ├── nodes/             # Modular researcher logic
│   ├── utils/             # Markdown → PDF utilities
│   └── services/          # WebSocket, MongoDB, PDF services
├── reports/               # Generated PDFs (gitignored)
├── ui/                    # React frontend
│   ├── src/               # Components & logic
│   ├── public/            # Static assets
│   └── package.json       # Frontend config
├── langgraph.json         # Node configs & DAG structure
├── langgraph_entry.py     # CLI-based execution
├── requirements.txt       # Python deps
├── setup.sh               # Setup script
├── .env.example           # Backend env template
├── ui/.env.example        # Frontend env template
├── demo/
│   └── Analyze-360-demo.mp4
└── README.md
⚙️ Prerequisites
Python 3.9+

Node.js 16+

MongoDB (optional, for persistence)

🛠️ Installation Guide
1. 📦 Clone the Repo
bash
Copy
Edit
git clone https://github.com/rithiksingh/Analyze-360.git
cd Analyze-360
2. 🧠 Backend Setup
Create & activate a virtual environment:

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
Set up environment variables:

env
Copy
Edit
# .env
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
Start the FastAPI server:

bash
Copy
Edit
uvicorn application:app --reload --port 8000
Docs: http://localhost:8000/docs

WebSocket: ws://localhost:8000/ws/status

3. 💻 Frontend Setup
Open a new terminal window:

bash
Copy
Edit
cd ui
npm install
Set up environment variables:

env
Copy
Edit
# ui/.env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/status
Run the dev server:

bash
Copy
Edit
npm run dev
Open in browser: http://localhost:5173

🧪 Usage
Launch the UI.

Enter a company name or ticker.

Click Start Research.

Watch real-time updates flow in.

View the final report and click Download PDF.

🧩 Architecture Overview
Research Graph
DAG of nodes defined in langgraph.json and executed in backend/graph.py.

WebSocketService
Broadcasts live updates (in_progress → completed/failed).

PDFService
Converts Markdown to styled PDF at reports/{job_id}.pdf.

MongoDBService (optional)
Stores metadata, intermediate results, and final reports.

React Frontend
Submits jobs, listens to WebSocket, and displays UI timeline.

🏅 Bonus Features
✅ Real-Time Status Timeline
Live WebSocket events with timestamps & visual updates.

✅ MongoDB Historical Storage
View and re-download reports from previous jobs.

✅ PDF Downloads
Export beautiful, clean Markdown reports.

✅ Error Handling
Node-level try/catch with MongoDB logging.

✅ Scalable Architecture
Easily extend graph nodes via langgraph.json.

✅ Secure by Design

API keys via environment variables

Pydantic input validation

CORS-protected endpoints

✅ Creative UI

Responsive Tailwind CSS

Dark/Light Mode

Collapsible Timeline Panels

LLM Chat Transcript Viewer

🤝 Contributing
Fork the repo

Create a feature branch:

bash
Copy
Edit
git checkout -b feature/YourFeature
Commit and push:

bash
Copy
Edit
git add .
git commit -m "Add <feature>"
git push origin feature/YourFeature
Open a Pull Request 🚀

📚 References
OpenAI

Tavily

Google Gemini

📬 Contact
Author: Rithik Singh
📧 Email: Hrithiksingh.hst@gmail.com

