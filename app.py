import os
from flask import Flask, render_template
from dotenv import load_dotenv
from models import BlogDB

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize Blog model
mongo_uri = os.getenv("MONGODB_URI")
blog_db = BlogDB(mongo_uri)

# Home page route
@app.route('/')
def home() -> str:
    return render_template('base.html')

@app.route('/mentions-legales')
def legal_notices() -> str:
    return render_template('legal_notices.html')

@app.route('/politique-cookies')
def cookies_policy() -> str:
    return render_template('cookies_policy.html')

@app.route('/contact')
def contact() -> str:
    return render_template('contact.html')

# Blog listing page
@app.route('/blog')
def blog() -> str:
    all_articles = blog_db.get_all_articles()  
    return render_template('blog.html', articles=all_articles)

# Single blog article page
@app.route('/blog/<article_id>')
def blog_article(article_id: str) -> str:
    article = blog_db.get_article_by_id(article_id)  
    if not article:
        return "Article non trouvé", 404
    return render_template('article.html', article=article)

# Quiz pages
@app.route("/quiz")
def quiz() -> str:
    return render_template("quiz.html")

@app.route("/quiz/cybersecurity")
def quiz_cybersecurity() -> str:
    return render_template("quiz_cybersecurity.html")

@app.route("/quiz/gdpr")
def quiz_gdpr() -> str:
    return render_template("quiz_gdpr.html")

@app.route("/quiz/ecology")
def quiz_ecology() -> str:
    return render_template("quiz_ecology.html")

@app.route("/quiz/sobriety")
def quiz_sobriety() -> str:
    return render_template("quiz_sobriety.html")

if __name__ == '__main__':
    app.run(debug=True)
