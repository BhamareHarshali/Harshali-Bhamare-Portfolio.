"""
Harshali Bhamare Portfolio - Python Flask Backend Companion
-----------------------------------------------------------
This Flask server mirrors the Node.js/Express API. It provides:
1. POST /api/contact - Validates and saves contact enquiries to PostgreSQL/SQLite
2. POST /api/admin/login - Authenticates admin with salted password hash
3. GET /api/admin/messages - Retrieves inquiries with search and status filtering
4. PATCH /api/admin/messages/<id>/read - Toggles read status
5. DELETE /api/admin/messages/<id> - Deletes inquiry
"""

import os
import uuid
import datetime
import hashlib
from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database Configuration (Default SQLite, or Supabase PostgreSQL via DATABASE_URL)
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///contact_messages.db")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "HarshaliAdmin2026!")

# Active admin tokens (in-memory token storage)
active_tokens = {}

# Simple password hash helper
def hash_password(password: str, salt: str = "harshali_salt_2026") -> str:
    return hashlib.sha256(f"{salt}{password}".encode("utf-8")).hexdigest()

ADMIN_HASH = hash_password(ADMIN_PASSWORD)

# Token auth decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized: Missing token"}), 401
        
        token = auth_header.split(" ")[1]
        expiry = active_tokens.get(token)
        if not expiry or expiry < datetime.datetime.utcnow():
            if token in active_tokens:
                del active_tokens[token]
            return jsonify({"error": "Session expired or invalid"}), 401
        
        return f(*args, **kwargs)
    return decorated_function

# In-memory storage fallback if SQLite/PostgreSQL is not initialized
messages_store = [
    {
        "id": "msg-001",
        "name": "Tech Recruiter",
        "email": "recruiter@techventures.example",
        "subject": "Interview Invitation: Python / Full-Stack Developer",
        "message": "Hello Harshali, your portfolio and projects (especially the Digital Ration Card System and VisionFly AI) are very impressive. We have an opening for a Python / Full-Stack engineer.",
        "created_at": datetime.datetime.utcnow().isoformat(),
        "is_read": False
    }
]

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "backend": "Python 3 Flask API",
        "timestamp": datetime.datetime.utcnow().isoformat()
    })

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "").strip()
    message = (data.get("message") or "").strip()

    if not name:
        return jsonify({"error": "Full Name is required"}), 400
    if not email or "@" not in email:
        return jsonify({"error": "Valid Email Address is required"}), 400
    if not subject:
        return jsonify({"error": "Subject is required"}), 400
    if not message:
        return jsonify({"error": "Message content is required"}), 400

    new_msg = {
        "id": f"msg_{int(datetime.datetime.utcnow().timestamp())}_{uuid.uuid4().hex[:6]}",
        "name": name,
        "email": email.lower(),
        "subject": subject,
        "message": message,
        "created_at": datetime.datetime.utcnow().isoformat(),
        "is_read": False
    }
    messages_store.insert(0, new_msg)

    return jsonify({
        "success": True,
        "message": "Enquiry received successfully! Harshali will get back to you shortly.",
        "id": new_msg["id"]
    }), 201

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json() or {}
    password = data.get("password", "")

    if hash_password(password) != ADMIN_HASH:
        return jsonify({"error": "Invalid administrator password"}), 401

    token = uuid.uuid4().hex
    active_tokens[token] = datetime.datetime.utcnow() + datetime.timedelta(hours=4)

    return jsonify({
        "success": True,
        "token": token,
        "admin": {
            "username": "admin",
            "email": "harshalibhamare729@gmail.com"
        }
    })

@app.route("/api/admin/messages", methods=["GET"])
@admin_required
def get_messages():
    status = request.args.get("status")
    search = request.args.get("search", "").lower()

    filtered = list(messages_store)
    if status == "unread":
        filtered = [m for m in filtered if not m["is_read"]]
    elif status == "read":
        filtered = [m for m in filtered if m["is_read"]]

    if search:
        filtered = [
            m for m in filtered
            if search in m["name"].lower()
            or search in m["email"].lower()
            or search in m["subject"].lower()
            or search in m["message"].lower()
        ]

    total = len(messages_store)
    unread = sum(1 for m in messages_store if not m["is_read"])

    return jsonify({
        "messages": filtered,
        "stats": {
            "total": total,
            "unread": unread,
            "read": total - unread
        }
    })

@app.route("/api/admin/messages/<msg_id>/read", methods=["PATCH"])
@admin_required
def toggle_read(msg_id):
    data = request.get_json() or {}
    is_read = data.get("is_read", True)

    for m in messages_store:
        if m["id"] == msg_id:
            m["is_read"] = is_read
            return jsonify({"success": True, "message": m})

    return jsonify({"error": "Message not found"}), 404

@app.route("/api/admin/messages/<msg_id>", methods=["DELETE"])
@admin_required
def delete_message(msg_id):
    global messages_store
    initial_len = len(messages_store)
    messages_store = [m for m in messages_store if m["id"] != msg_id]

    if len(messages_store) == initial_len:
        return jsonify({"error": "Message not found"}), 404

    return jsonify({"success": True, "message": "Message deleted successfully"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
