from flask import Flask, redirect, url_for, request,render_template
app = Flask(__name__)

@app.route('/blog/<int:postID>')
def show_blog(postID):
   return 'Blog Number %d' % postID

@app.route('/rev/<float:revNo>')
def revision(revNo):
   return 'Revision Number %f' % revNo

@app.route('/guest/<guest>')
def hello_guest(guest):
   return 'Hello %s as Guest' % guest




@app.route('/success/<name>')
def success(name):
   return 'welcome %s' % name

@app.route('/')
def index():
   return render_template('hello.html')

@app.route('/result')
def result():
   dict = {'phy':50,'che':60,'maths':70}
   return render_template('result.html', result = dict)



@app.route('/hello/<user>')
def hello_name(user):
   return render_template('hello.html', name = user)



@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['nm']
      return redirect(url_for('success',name = user))
   else:
      user = request.args.get('nm')
      return redirect(url_for('success',name = user))

if __name__ == '__main__':
   app.run()