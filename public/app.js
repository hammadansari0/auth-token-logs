async function login() {
  const body = document.getElementById('loginBody').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  const data = await res.json();
  document.getElementById('token').value = data.token;
}

async function sendRequest() {
  const method = document.getElementById('method').value;
  const endpoint = document.getElementById('endpoint').value;
  const body = document.getElementById('body').value;
  const token = document.getElementById('token').value;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };

  if (method !== 'GET' && method !== 'DELETE') {
    options.body = body;
  }

  const res = await fetch(endpoint, options);
  const text = await res.text();

  document.getElementById('response').innerText = text;
}

// connect to SSE
const eventSource = new EventSource('/logs/stream');

eventSource.onmessage = function(event) {
  const log = JSON.parse(event.data);

  const container = document.getElementById('logContainer');

  const div = document.createElement('div');
  div.className = 'log';

  div.innerText =
    `[${log.time}] ${log.method} ${log.endpoint} | token: ${log.token.substring(0, 8)}...`;

  // newest on top
  container.prepend(div);
};