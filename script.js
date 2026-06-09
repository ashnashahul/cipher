
  let shift = 3;
  let cipherType = 'caesar';

  const cipherTypeEl   = document.getElementById('cipherType');
  const shiftLabel     = document.getElementById('shiftValueLabel');
  const shiftVal       = document.getElementById('shiftVal');
  const shiftGroup     = document.getElementById('shiftGroup');
  const strengthBar    = document.getElementById('strengthBar');
  const strengthLabel  = document.getElementById('strengthLabel');
  const plainInput     = document.getElementById('plainInput');
  const encOutput      = document.getElementById('encryptedOutput');
  const encInput       = document.getElementById('encryptedInput');
  const decOutput      = document.getElementById('decryptedOutput');

  function caesarChar(code, s) {
    if (code >= 65 && code <= 90) return ((code - 65 + s) % 26) + 65;
    if (code >= 97 && code <= 122) return ((code - 97 + s) % 26) + 97;
    return code;
  }

  function process(text, encrypt) {
    const s = cipherType === 'rot13' ? 13 : (encrypt ? shift : 26 - shift);
    return text.split('').map(c => String.fromCharCode(caesarChar(c.charCodeAt(0), s))).join('');
  }

  function runVisualizer() {
    ['vis1','vis2','vis3'].forEach(id => document.getElementById(id).classList.remove('active'));
    let i = 0;
    const ids = ['vis1','vis2','vis3'];
    const iv = setInterval(() => {
      if (i > 0) document.getElementById(ids[i-1]).classList.remove('active');
      document.getElementById(ids[i]).classList.add('active');
      i++;
      if (i >= ids.length) { clearInterval(iv); }
    }, 220);
  }

  function setOutput(el, text) {
    el.value = text;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'typing 0.3s ease';
  }

  function buildTransform() {
    const grid = document.getElementById('transformGrid');
    grid.innerHTML = '';
    const s = cipherType === 'rot13' ? 13 : shift;
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(ch => {
      const enc = String.fromCharCode(caesarChar(ch.charCodeAt(0), s));
      const div = document.createElement('div');
      div.className = 't-pair';
      div.innerHTML = `<span class="t-plain">${ch}</span><span class="t-arrow">↓</span><span class="t-cipher">${enc}</span>`;
      grid.appendChild(div);
    });
  }

  function updateStrength(n) {
    const pct = (n / 25) * 100;
    strengthBar.style.width = pct + '%';
    let label, color;
    if (n <= 5)       { label = 'Low';    color = '#ef4444'; }
    else if (n <= 12) { label = 'Moderate'; color = '#f59e0b'; }
    else if (n <= 19) { label = 'Good';   color = '#3b82f6'; }
    else              { label = 'Strong'; color = '#10b981'; }
    strengthBar.style.background = color;
    strengthLabel.textContent = label;
    strengthLabel.style.color = color;
  }

  function updateAll() {
    const plain = plainInput.value;
    if (plain) {
      const enc = process(plain, true);
      setOutput(encOutput, enc);
      runVisualizer();
    }
    const encIn = encInput.value;
    if (encIn) {
      setOutput(decOutput, process(encIn, false));
    }
    buildTransform();
    updateStrength(cipherType === 'rot13' ? 13 : shift);
  }

  cipherTypeEl.addEventListener('change', () => {
    cipherType = cipherTypeEl.value;
    shiftGroup.style.opacity = cipherType === 'rot13' ? '0.4' : '1';
    shiftGroup.style.pointerEvents = cipherType === 'rot13' ? 'none' : 'auto';
    updateAll();
  });

  function setShift(n) {
    shift = Math.max(1, Math.min(25, n));
    shiftVal.textContent = shift;
    shiftLabel.textContent = shift;
    updateAll();
  }

  document.getElementById('shiftDown').addEventListener('click', () => setShift(shift - 1));
  document.getElementById('shiftUp').addEventListener('click',   () => setShift(shift + 1));

  plainInput.addEventListener('input', () => {
    const enc = process(plainInput.value, true);
    setOutput(encOutput, enc);
    if (plainInput.value) runVisualizer();
  });

  encInput.addEventListener('input', () => {
    setOutput(decOutput, process(encInput.value, false));
  });

  document.getElementById('useOutputBtn').addEventListener('click', () => {
    encInput.value = encOutput.value;
    setOutput(decOutput, process(encInput.value, false));
  });

  function copyText(text, btn) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied ✓';
      btn.style.background = 'var(--green)';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1400);
    });
  }

  document.getElementById('copyEncBtn').addEventListener('click', function() {
    copyText(encOutput.value, this);
  });

  document.getElementById('copyDecBtn').addEventListener('click', function() {
    copyText(decOutput.value, this);
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    plainInput.value = '';
    encOutput.value = '';
    encInput.value = '';
    decOutput.value = '';
    ['vis1','vis2','vis3'].forEach(id => document.getElementById(id).classList.remove('active'));
  });

  buildTransform();
  updateStrength(shift);