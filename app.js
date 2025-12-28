const { useState, useEffect } = React;

const missions = [
  {
    title: "Mission 1 – Authentication",
    stages: [
      {
        q: "وش هو أكبر خطر كي نقارن القيم مباشرة؟",
        options: ["Bruteforce", "SQL Injection", "DDoS"],
        correct: 1,
        explain: "SQL Injection يصير كي المدخلات ما تكونش محمية."
      },
      {
        q: "اختَر محاولة Login خطيرة:",
        options: [
          "admin / 1234",
          "admin' / anything",
          "user / user"
        ],
        correct: 1,
        explain: "العلامة ' تقدر تكسر منطق التحقق."
      },
      {
        q: "وش هو الحل الصحيح؟",
        options: [
          "نثق في المستخدم",
          "Prepared Statements",
          "نخفي رسالة الخطأ"
        ],
        correct: 1,
        explain: "Prepared Statements تمنع التلاعب."
      }
    ]
  },
  {
    title: "Mission 2 – Input Validation",
    stages: [
      {
        q: "وين يصير الخطر؟",
        options: ["Input", "Database", "Server Hardware"],
        correct: 0,
        explain: "التحقق يبدأ من Input."
      },
      {
        q: "وش السلوك الخطير؟",
        options: [
          "عرض المحتوى مباشرة",
          "تنظيف المدخلات",
          "استعمال Escape"
        ],
        correct: 0,
        explain: "عرض المحتوى بلا تنظيف خطر."
      }
    ]
  }
];

function App() {
  const [mission, setMission] = useState(0);
  const [stage, setStage] = useState(0);
  const [time, setTime] = useState(120);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (time <= 0) return;
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  const current = missions[mission].stages[stage];

  function choose(i) {
    if (i === current.correct) {
      setMsg("✅ صحيح");
      if (stage + 1 < missions[mission].stages.length) {
        setTimeout(() => {
          setStage(stage + 1);
          setMsg("");
        }, 800);
      } else if (mission + 1 < missions.length) {
        setTimeout(() => {
          setMission(mission + 1);
          setStage(0);
          setMsg("");
        }, 1000);
      } else {
        setMsg("🎉 كملت كل المراحل!");
      }
    } else {
      setMsg("❌ خطأ");
      setTime(time - 10);
    }
  }

  return (
    <div className={`center ${time <= 10 ? "shake" : ""}`}>
      <div className="card">
        <div className="timer">⏱️ {time}s</div>
        <h3>{missions[mission].title}</h3>
        <p>{current.q}</p>

        {current.options.map((op, i) => (
          <button key={i} onClick={() => choose(i)}>
            {op}
          </button>
        ))}

        <div className="terminal">
          {msg || "اختَر الإجابة الصحيحة."}
          {msg === "✅ صحيح" && (
            <div>📘 {current.explain}</div>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
