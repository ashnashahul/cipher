# Project 2 - Caesar Cipher (Basic Encryption & Decryption)

A simple encryption and decryption tool built as part of the DecodeLabs Cybersecurity Internship (Batch 2026).

---

## About the Project

This project demonstrates the Caesar Cipher — one of the oldest and simplest encryption techniques. Each letter in the text is shifted by a fixed number (the shift key) to produce encrypted text. Decryption reverses the process using the same key.

---

## Features

- Encrypt plain text using Caesar Cipher
- Decrypt encrypted text back to original
- Toggle between Caesar Cipher and ROT13
- Show / Hide password input
- Shift strength indicator
- Character transformation preview (A → D, B → E ...)
- Copy encrypted / decrypted output
- Clear All button
- Responsive dark green & black UI

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Main page structure |
| `style.css` | Styling and theme |
| `script.js` | Encryption / decryption logic |
| `caesar_cipher.py` | Python version of the cipher |

---

## How Caesar Cipher Works

Each letter is shifted forward by the key value.

Example with shift `3`:
- `A → D`
- `H → K`
- `Z → C` (wraps around)

**Encryption formula:** `E(x) = (x + n) % 26`  
**Decryption formula:** `D(x) = (x - n + 26) % 26`

Non-alphabet characters (spaces, numbers, punctuation) are preserved unchanged.

---

## How to Run

**Web version:**
Just open `index.html` in any browser.

**Python version:**
```bash
python caesar_cipher.py
```

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Python 3

---

## Internship Details

- **Program:** DecodeLabs Industrial Training
- **Batch:** 2026
- **Track:** Cyber Security Analyst
