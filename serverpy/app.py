from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  

@app.route("/user", methods=["POST"])
def user():
    data = request.get_json()

    username = data.get('user')
    phone = data.get('phone')
    email = data.get('email')

    return jsonify({"username":username,
                    "phone":phone,
                    "email":email})


if __name__ == "__main__":
    app.run(debug=True)
