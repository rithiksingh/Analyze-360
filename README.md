# Analyze 360
An AI-powered full‑stack application for performing in‑depth company due diligence. Company Researcher uses LangChain and OpenAI APIs to research companies, stream status updates over WebSockets, and generate professional‑grade reports and PDFs.

---
🎥 [Watch Demo Video](https://drive.google.com/file/d/1bSyOqBYDTY_4PpqT-NC034h8LtJVrShD/view?usp=drive_link)



## 🚀 Features

* **AI‑Driven Research Pipeline**: Modular graph of researchers (company, industry, financial, news) with streaming updates.
* **Streaming Status Updates**: Real‑time progress over WebSocket so you can visualize each research step.
* **PDF Report Generation**: Convert compiled markdown reports into downloadable PDFs.
* **Optional Persistence**: Integrate with MongoDB to store jobs and reports for later retrieval.
* **Modern Tech Stack**:

  * **Backend**: FastAPI, Uvicorn, Python, Pydantic
  * **Frontend**: React, Vite, Typescript, Tailwind CSS, Lucide Icons
  * **AI**: OpenAI GPT, Tavily API, Gemini API (configurable)
  * **Docs**: Swagger‑UI at `/docs`

---

## 📂 Repository Structure

```
company-researcher/
├── application.py        # FastAPI entrypoint
├── backend/
│   ├── graph.py         # Core research graph orchestration
│   ├── nodes/           # Researcher implementations
│   ├── utils/           # PDF/markdown utils & reference extraction
│   └── services/        # MongoDB, WebSocket, PDF services
├── reports/             # Output PDF files
├── ui/                  # React Vite frontend
│   ├── src/
│   │   └── App.tsx      # Main UI component
│   ├── public/
│   └── package.json
├── .env                 # Backend environment variables
├── ui/.env              # Frontend environment variables
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

---

## ⚙️ Prerequisites

* **Python 3.9+**
* **Node.js 16+** and **npm**
* **MongoDB** (optional, for persistence)

---

## 🛠️ Setup & Installation

### 1. Clone & Navigate

```bash
git clone https://github.com/pogjester/company-research-agent.git company-researcher
cd company-researcher
```

### 2. Backend Setup

1. Create & activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate     # macOS/Linux
   .\.venv\Scripts\activate    # Windows PowerShell
   ```

2. Install Python dependencies:

   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. Create a `.env` in the project root with your API keys:

   ```dotenv
   TAVILY_API_KEY=your_tavily_key
   GEMINI_API_KEY=your_gemini_key
   OPENAI_API_KEY=your_openai_key
   # Optional: MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/dbname
   ```

4. Start the FastAPI server:

   ```bash
   uvicorn application:app --reload --port 8000
   ```

### 3. Frontend Setup

1. In a new terminal, navigate to the UI folder:

   ```bash
   cd ui
   ```
2. Install npm packages:

   ```bash
   npm install
   ```
3. Create `ui/.env` with:

   ```dotenv
   VITE_API_URL=http://localhost:8000
   VITE_WS_URL=ws://localhost:8000
   ```
4. Start the Vite dev server:

   ```bash
   npm run dev
   ```
5. Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🚀 Usage

1. Enter company details in the UI form and click **Start Research**.
2. Watch real‑time progress in the **Research Status** panel.
3. When complete, view the generated report and click **Download PDF**.
4. (Optional) Query past jobs via REST endpoints:

   * **GET** `/research/{job_id}`
   * **GET** `/research/{job_id}/report`
   * **POST** `/research/{job_id}/generate-pdf`

---

## 🧩 Architecture Overview

* **Graph Orchestration**: `backend/graph.py` builds a directed acyclic graph of researcher nodes.
* **WebSocketManager**: Handles client subscriptions and status broadcasts.
* **PDFService**: Renders markdown to PDF via ReportLab.
* **MongoDBService**: Persists job metadata and report content.

---

## 🙌 Contributing

1. Fork the repo
2. Create a feature branch `git checkout -b feature/YourFeature`
3. Commit changes \`git commit -m "Add feature"
4. Push to the branch `git push origin feature/YourFeature`
5. Open a Pull Request

---
## References 🙏

- [Tavily](https://tavily.com/) for the research API
- [Google Gemini](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini) for the text generation model
