📁 Repository Contents
Backend (FastAPI, Python)

application.py – FastAPI entrypoint (HTTP & WebSocket)

backend/graph.py – Builds & runs the research graph

backend/nodes/ – Researcher node modules (company, industry, financials, etc.)

backend/utils/ – Markdown helpers & PDF conversion

backend/services/ – MongoDBService, PDFService, WebSocketService

Frontend (React, TypeScript, Vite, Tailwind CSS)

ui/src/ – React components & WebSocket client logic

ui/public/ – Static assets

ui/package.json – Frontend dependencies & scripts

Config & Scripts

langgraph.json – Node definitions & execution order

langgraph_entry.py – CLI entrypoint for offline runs

requirements.txt – Python dependencies

setup.sh – Virtual environment & env-var setup

.env.example – Environment variable template

Demo Video

demo/Analyze-360-demo.mp4 – 5-minute walkthrough (setup, features, error handling)

Docs & Metadata

README.md – This file

LICENSE – MIT License

.gitignore – Standard ignores

🚀 Setup Instructions
All commands assume you are in the project’s root directory.

Clone & Enter

bash
Copy
Edit
git clone https://github.com/rithiksingh/Analyze-360.git
cd Analyze-360
Backend

bash
Copy
Edit
python3 -m venv .venv
source .venv/bin/activate          # macOS/Linux
# .\.venv\Scripts\activate         # Windows PowerShell
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your OPENAI_API_KEY, TAVILY_API_KEY, GEMINI_API_KEY, MONGODB_URI
uvicorn application:app --reload --port 8000
Visit http://localhost:8000/docs for Swagger UI

WebSocket: ws://localhost:8000/ws/status

Frontend

bash
Copy
Edit
cd ui
npm install
cp .env.example .env
# In ui/.env: set VITE_API_URL=http://localhost:8000 and VITE_WS_URL=ws://localhost:8000/ws/status
npm run dev
Open http://localhost:5173

🏗 Architecture Overview
graphql
Copy
Edit
Analyze-360/
├── application.py            # FastAPI HTTP routes & WebSocket manager
├── backend/
│   ├── graph.py              # Builds & runs research graph
│   ├── nodes/                # Research modules (LLM calls & scraping)
│   ├── utils/                # Markdown & PDF helpers
│   └── services/             # MongoDB, PDF, WebSocket services
├── ui/                       # React frontend (Vite, TS, Tailwind)
├── langgraph.json            # Defines nodes & dependencies
├── langgraph_entry.py        # CLI runner for the graph
├── requirements.txt          # Backend dependencies
├── setup.sh                  # Env setup script
├── .env.example              # Env var template
└── README.md                 # This file
📜 API Summary
POST /research/start
Request:

json
Copy
Edit
{
  "company_identifier": "string",
  "graph_config": { /* optional overrides */ }
}
Response:

json
Copy
Edit
{
  "job_id": "string",
  "status": "queued"
}
GET /research/{job_id}
Returns job status, node list, timestamps.

GET /research/{job_id}/report
Returns full Markdown report (text/markdown).

POST /research/{job_id}/generate-pdf
Returns:

json
Copy
Edit
{
  "pdf_url": "/reports/{job_id}.pdf"
}
WebSocket /ws/status
Client handshake:

json
Copy
Edit
{
  "action": "subscribe",
  "job_id": "optional"
}
Server messages:

json
Copy
Edit
{
  "job_id": "string",
  "node_name": "string",
  "status": "in_progress" | "completed" | "failed",
  "timestamp": "ISO8601"
}
▶️ Running Instructions
Start backend & frontend (see Setup).

Navigate to http://localhost:5173.

Enter a company identifier (e.g., “AAPL”) and click Start Research.

Watch the live progress timeline.

View the Markdown report when complete.

Click Download PDF to save the report locally.

🎥 Demo Video
See demo/Analyze-360-demo.mp4 for a 5-minute walkthrough covering setup, features, and error handling.

🏅 Bonus Features Implemented
Real-Time Status Updates

WebSocket endpoint (/ws/status) broadcasts node status with timestamps.

React frontend renders a live progress timeline.

MongoDB Persistence Layer

All jobs, node outputs, and final reports are stored in MongoDB when MONGODB_URI is set.

Query past jobs via REST (GET /research/{job_id}) without re-running.

Downloadable Output (PDF Generation)

Consolidated Markdown is converted to PDF via PDFService.

PDF saved to /reports/{job_id}.pdf and returned by POST /research/{job_id}/generate-pdf.

Frontend’s “Download PDF” button triggers the file download.

Error Handling & Monitoring

Each node wrapped in try/catch; failures logged to console and MongoDB “errors” collection.

Frontend displays user-friendly error messages and retry options.

Scalability Considerations

Research graph defined in langgraph.json and executed dynamically, allowing easy addition/removal of nodes.

deploy/ contains a Dockerfile and Kubernetes manifest for containerization & horizontal scaling.

Security Considerations

Environment variables protect API keys (no hard-coded secrets).

CORS restricted to trusted origins in application.py.

Pydantic validation on all incoming requests.

Creative UI/UX

Responsive design (Tailwind CSS) for desktop & mobile.

Dark/light mode toggle (CSS variables).

Collapsible panels in the timeline for detailed node outputs.

“Research Chat” component stores history of user inputs and LLM replies.

📝 Notes & Assumptions
Company Identifier can be a ticker or full name. If ambiguous, the “Company Overview” node uses LLM prompts to infer the correct entity.

Data Sources: All research (financials, industry, news) is synthesized via LLM calls (OpenAI, Tavily, Gemini). Future versions could integrate dedicated data APIs.

Persistence: If MONGODB_URI is not set, all data remains in-memory (until server restart).

🤝 Contact
Author: Hrithik Singh
Email: hrithiksingh.hst@gmail.com