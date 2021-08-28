from flask import Flask,request,render_template,send_file,redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_mysqldb import MySQL
from flask_mail import Mail
import json

# reading Json
with open("config.json","r") as p:
    params = json.load(p)["params"]

local_server = True
app = Flask(__name__)
app.secret_key = "###################" # Secret key here
app.config.update(
   MAIL_SERVER = "smtp.gmail.com",
   MAIL_PORT = '465',
   MAIL_USE_SSL = True,
   MAIL_USERNAME = params["gmail-username"],
   MAIL_PASSWORD = params["gmail-password"]
)
mail = Mail(app)
if(local_server):
    app.config["SQLALCHEMY_DATABASE_URI"] = params["local_uri"]
else:
    app.config['SQLALCHEMY_TRACK_MODIFICATION'] = params["production_uri"]

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/')
def index():
   return render_template('home.html')

@app.route('/download')
def download_file():
	path = params["resume_file"]
	return send_file(path, as_attachment=True)

class Contacts(db.Model):
    sno = db.Column(db.Integer,primary_key=True)    
    name = db.Column(db.String(50),nullable=False)
    phone_num = db.Column(db.String(50),nullable=False)
    website = db.Column(db.String(50),nullable=False)
    email = db.Column(db.String(50),nullable=False)
    msg = db.Column(db.String(200),nullable=False)
    date = db.Column(db.DateTime,default=datetime.utcnow)

@app.route('/contact',methods=["GET","POST"])
def contact():
    if request.method == "POST":
        name = request.form['name']
        number = request.form['number']
        website = request.form['website']
        email = request.form['email']
        msg = request.form['desc']
        record = Contacts(name = name,phone_num=number,website=website,email=email,msg=msg)
        db.session.add(record)
        db.session.commit()
        mail.send_message('New Message From Portfolio-ABHI',sender=(name,email),recipients=[params["gmail-username"]],
        body=msg+ '\n' + number)
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=False)
