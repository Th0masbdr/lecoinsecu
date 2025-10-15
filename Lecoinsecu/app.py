from flask import Flask, render_template

app = Flask(__name__)

# Page principale
@app.route('/')
def index():
    return render_template('index.html')

# Pages "Bonnes pratiques"
@app.route('/cybersecurite')
def cybersecurite():
    return render_template('cybersecurite.html')

@app.route('/rgpd')
def rgpd():
    return render_template('rgpd.html')

@app.route('/ecologie')
def ecologie():
    return render_template('ecologie.html')

@app.route('/sobriete')
def sobriete():
    return render_template('sobriete.html')


if __name__ == '__main__':
    app.run(debug=True)
