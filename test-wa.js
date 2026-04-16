const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const ObjectApiKey = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME;

const payloadText = {
  number: '201098620547',
  text: 'Great caption via sendText!'
};

async function run() {
  const res = await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': ObjectApiKey },
    body: JSON.stringify(payloadText),
  });
  const t = await res.text();
  console.log('Tested sendText:', t);
}
run();
