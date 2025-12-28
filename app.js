const { useState, useEffect } = React;

function App() {
  const [screen, setScreen] = useState("login");
  const [time, setTime] = useState(60);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  // TIMER
  useEffect(() => {
    if (screen !== "level") return;
    if (time <= 0) {
      setMsg("❌ الوقت سالى!");
      return;
    }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, screen]);

  function checkPayload() {
    // محاكاة تفكير أمني (مش اختراق حقيقي)
    if (input.includes("'") || input.toLowerCase().includes("or")) {
      setMsg("✅ نجحت! فهمت الفكرة.");
      localStorage.setItem("level1", "done");
    } else {
      setMsg("❌ خطأ. جرّب تفكّر اكثر.");
      setTime(time - 5);
    }
  }

  // LOGIN (وهمي)
  if (screen === "login") {
    return (
      <div className="center">
        <div className="card">
          <h2 className="title">CYBERPRESSURE</h2>
          <input placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button onClick={() => setScreen("level")}>CONNECT</button>
        </div>
      </div>
    );
  }

  // LEVEL 1
  return (
    <div className={`center ${time <= 10 ? "shake" : ""}`}>
      <div className="card">
        <div className="timer">⏱️ الوقت: {time}s</div>
        <h3>Level 1 – Auth Bypass (Simulation)</h3>
        <p>راك قدّام Login وهمي. كيفاش تفكّر تدخل؟</p>

        <input
          placeholder="اكتب فكرتك هنا"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={checkPayload}>SUBMIT</button>

        <div className="terminal">
          {msg || "Terminal: استعمل مخّك، مش أدوات."}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);