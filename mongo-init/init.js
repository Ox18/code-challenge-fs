db = db.getSiblingDB("calls");

db.queues.insertMany([
  {
    name: "Medical Spanish",
    alias: "medical_spanish",
  },
  {
    name: "Medical French",
    alias: "medical_french",
  },
  {
    name: "Medical Health",
    alias: "medical_health",
  },
  {
    name: "Emergency Triage",
    alias: "emergency_triage",
  },
]);

print(
  "✅ Base de datos 'calls' y colección 'queues' creada con datos iniciales."
);
