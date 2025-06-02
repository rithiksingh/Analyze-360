# 🔍 Analyze-360

An **AI-powered**, full-stack application for deep company due diligence.  
Analyze-360 combines **LangGraph**, **OpenAI**, **Tavily**, and a modern React UI to research companies, stream real-time WebSocket updates, and generate polished PDF reports.

---

## 🚀 Features

- **AI-Driven Research Pipeline**  
  Modular graph of researcher nodes: *Company Overview*, *Industry Analysis*, *Financial Summary*, *News Aggregation*.

- **Streaming Status Updates**  
  Real-time progress visualization over WebSockets as each node completes.

- **PDF Report Generation**  
  Compiles Markdown into styled, downloadable PDF files.

- **Optional MongoDB Persistence**  
  Store job metadata, intermediate outputs, and final reports.

- **Modern Tech Stack**  
  - **Backend:** FastAPI · Uvicorn · Python · Pydantic  
  - **Frontend:** React · Vite · TypeScript · Tailwind CSS · Lucide Icons  
  - **AI Providers:** OpenAI GPT (default) · Tavily API · Google Gemini (configurable)  
  - **Docs:** Swagger UI available at `/docs`

---

## 📂 Repository Structure

```text
Analyze-360/
├── application.py         # FastAPI entrypoint
├── backend/
│   ├── graph.py           # DAG orchestration
│   ├── nodes/             # Researcher modules
│   ├── utils/             # Markdown → PDF helpers
│   └── services/          # WebSocket, MongoDB, PDF
├── reports/               # Generated PDFs (git-ignored)
├── ui/
│   ├── src/               # React components & logic
│   ├── public/            # Static assets
│   └── package.json
├── langgraph.json         # DAG configuration
├── langgraph_entry.py     # CLI runner
├── requirements.txt
├── setup.sh
├── .env.example
├── ui/.env.example
└── README.md
⚙️ Prerequisites
Python 3.9 +

Node.js 16 + (with npm)

MongoDB (optional, for persistence)

🛠️ Setup & Installation
1 · Clone the repository
bash
Copy
Edit
git clone https://github.com/rithiksingh/Analyze-360.git
cd Analyze-360
2 · Backend
bash
Copy
Edit
# Create & activate virtual env
python3 -m venv .venv
source .venv/bin/activate      # macOS/Linux
# .\.venv\Scripts\activate     # Windows
bash
Copy
Edit
# Install Python deps
pip install --upgrade pip
pip install -r requirements.txt
Create a .env file:

dotenv
Copy
Edit
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
GEMINI_API_KEY=your_gemini_key
# Optional:
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/yourdb
bash
Copy
Edit
# Run FastAPI server
uvicorn application:app --reload --port 8000
Swagger UI → http://localhost:8000/docs

WebSocket → ws://localhost:8000/ws/status

3 · Frontend
bash
Copy
Edit
cd ui
npm install
Create ui/.env:

dotenv
Copy
Edit
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/status
bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser.

🚦 Usage
Open the UI and enter a company name or ticker.

Click Start Research.

Watch real-time status updates.

Review the generated report.

Click Download PDF.

REST API
Method & Path	Purpose
GET /research/{job_id}	Job metadata
GET /research/{job_id}/report	Markdown report
POST /research/{job_id}/generate-pdf	Generate / return PDF

🧩 Architecture Overview
Graph Execution — backend/graph.py runs the DAG in langgraph.json.

WebSocket Manager — streams node events (in_progress → completed/failed).

PDFService — Markdown → PDF with ReportLab.

MongoDBService (optional) — job persistence.

React Frontend — submits jobs, listens for updates, renders reports.

🏅 Bonus Features
✅ Live WebSocket timeline

✅ MongoDB job history

✅ One-click PDF export

✅ Robust error handling

✅ Extensible DAG

✅ Secure env-var management

✅ Responsive dark/light UI

🙌 Contributing
bash
Copy
Edit
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature/YourFeature

# 3. Commit & push
git add .
git commit -m "Add: Your feature"
git push origin feature/YourFeature
Then open a Pull Request 🚀

📚 References
https://openai.com/

https://tavily.com/

https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini

📬 Contact
Author: Rithik Singh
📧 Hrithiksingh.hst@gmail.com

