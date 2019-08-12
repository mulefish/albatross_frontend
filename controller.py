from flask import Flask, render_template, request,jsonify
import sqlite3 as sql
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('home.html')

@app.route('/enternew')
def new_student():
   return render_template('student.html')

@app.route('/addrec',methods = ['POST', 'GET'])
def addrec():
   if request.method == 'POST':
      try:
         nm = request.form['nm']
         addr = request.form['add']
         city = request.form['city']
         pin = request.form['pin']
         
         with sql.connect("database.db") as con:
            cur = con.cursor()
            
            cur.execute("INSERT INTO students (name,addr,city,pin) VALUES (?,?,?,?)",(nm,addr,city,pin) )
            
            con.commit()
            msg = "Record successfully added"
      except:
         con.rollback()
         msg = "error in insert operation"
      
      finally:
         return render_template("result.html",msg = msg)
         con.close()

@app.route('/list')
def list():
   con = sql.connect("database.db")
   con.row_factory = sql.Row
   
   cur = con.cursor()
   cur.execute("select * from students")
   
   rows = cur.fetchall()
   return render_template("list.html",rows = rows)


@app.route('/history/<filename>/')
def get_history(filename):
   con = sql.connect("prep/games.db")
   con.row_factory = sql.Row
   cur = con.cursor()
   query = "select * from games where name = '{0}'".format(filename)
   cur.execute(query )
   moves = cur.fetchone()
   j = jsonify(moves["moves"])
   return j

@app.route('/histories/')
def get_histories():
   con = sql.connect("prep/games.db")
   con.row_factory = sql.Row
   
   cur = con.cursor()
   cur.execute("select name from games")
   
   rows = cur.fetchall()
   r = [] 
   for row in rows:  
      r.append(row["name"])
   j = jsonify(r)
   print(j)
   return j



@app.route('/game/')
def game():
   return render_template("game.html")


if __name__ == '__main__':
   app.run(debug = True)