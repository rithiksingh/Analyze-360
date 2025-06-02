🔍 Analyze-360
An AI-powered, full-stack application for in-depth company due diligence. Analyze-360 combines LangGraph, OpenAI, Tavily, and a modern React UI to research companies, stream real-time WebSocket updates, and produce polished PDF reports.

🚀 Features
AI-Driven Research Pipeline
Modular graph of researcher nodes: Company Overview, Industry Analysis, Financial Summary, and News Aggregation.

Streaming Status Updates
Real-time progress visualization over WebSockets as each node completes.

PDF Report Generation
Compiles Markdown into styled, downloadable PDF files.

Optional MongoDB Persistence
Store job metadata, intermediate outputs, and final reports for future retrieval.

Modern Tech Stack

Backend: FastAPI · Uvicorn · Python · Pydantic

Frontend: React · Vite · TypeScript · Tailwind CSS · Lucide Icons

AI: OpenAI GPT (default) · Tavily API · Google Gemini (configurable)

Docs: Swagger UI available at /docs

📂 Repository Structure
text
Copy
Edit
Analyze-360/
├── application.py         # FastAPI entrypoint
├── backend/
│   ├── graph.py           # Research DAG orchestration
│   ├── nodes/             # Researcher modules
│   ├── utils/             # Markdown → PDF helpers
│   └── services/          # WebSocket, MongoDB, PDF services
├── reports/               # Generated PDFs (git-ignored)
├── ui/                    # React + Vite frontend
│   ├── src/               # Components & logic
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── langgraph.json         # DAG configuration
├── langgraph_entry.py     # CLI for offline graph runs
├── requirements.txt       # Python dependencies
├── setup.sh               # Bootstrap script
├── .env.example           # Backend env-var template
├── ui/.env.example        # Frontend env-var template
├── demo/
│   └── Analyze-360-demo.mp4
└── README.md
⚙️ Prerequisites
Python 3.9 or newer

Node.js 16 or newer (with npm)

MongoDB (optional, for persistence)

🛠️ Setup & Installation
1 · Clone the Repository
bash
Copy
Edit
git clone https://github.com/rithiksingh/Analyze-360.git
cd Analyze-360
2 · Backend Setup
Create & activate a virtual environment

bash
Copy
Edit
python3 -m venv .venv
source .venv/bin/activate      # macOS/Linux
# .\.venv\Scripts\activate     # Windows
Install Python dependencies

bash
Copy
Edit
pip install --upgrade pip
pip install -r requirements.txt
Configure environment variables

Create .env in the project root:

dotenv
Copy
Edit
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
GEMINI_API_KEY=your_gemini_key
# Optional:
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/yourdbname
Start the FastAPI server

bash
Copy
Edit
uvicorn application:app --reload --port 8000
Swagger UI → http://localhost:8000/docs

WebSocket → ws://localhost:8000/ws/status

3 · Frontend Setup
Open a new terminal and navigate to ui/

bash
Copy
Edit
cd ui
Install dependencies

bash
Copy
Edit
npm install
Configure frontend env vars

Create ui/.env:

dotenv
Copy
Edit
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/status
Start the Vite dev server

bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser.

🚦 Usage
Open the web UI and enter a company name or ticker.

Click Start Research to launch the pipeline.

Watch real-time progress in the Research Status panel.

After completion, review the generated report.

Click Download PDF to save the final document.

(Optional) Query past jobs via REST:

Endpoint	Description
GET /research/{job_id}	Fetch job metadata
GET /research/{job_id}/report	Retrieve Markdown report
POST /research/{job_id}/generate-pdf	Generate/download PDF

🧩 Architecture Overview
Graph Execution
backend/graph.py loads and runs the DAG defined in langgraph.json.

WebSocket Manager
Streams node status events (in_progress → completed/failed) to clients.

PDFService
Converts Markdown to a styled PDF via ReportLab.

MongoDBService (optional)
Persists jobs, node outputs, and reports when MONGODB_URI is set.

React Frontend
Submits jobs, listens for WebSocket updates, and renders reports with PDF download.

🏅 Bonus Features
✅ Live WebSocket Timeline

✅ MongoDB Job History

✅ One-Click PDF Export

✅ Robust Error Handling

✅ Easily Extensible DAG

✅ Secure Env-Var Management

✅ Responsive Dark/Light UI

🙌 Contributing
Fork the repository.

Create your feature branch:

bash
Copy
Edit
git checkout -b feature/YourFeature
Commit your changes:

bash
Copy
Edit
git commit -m "Add: Your feature"
Push the branch:

bash
Copy
Edit
git push origin feature/YourFeature
Open a Pull Request 🚀

📚 References
OpenAI

Tavily API

Google Gemini

📬 Contact
Author: Rithik Singh
📧 Hrithiksingh.hst@gmail.com

Happy researching!