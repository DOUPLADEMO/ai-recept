
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Simulated recipe data
recipes = [
    {"title": "Pasta Primavera", "description": "A delicious pasta with fresh vegetables.", "url": "http://example.com/pasta"},
    {"title": "Chicken Soup", "description": "Classic chicken soup recipe.", "url": "http://example.com/soup"}
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recipes', methods=['GET'])
def get_recipes():
    ingredients = request.args.get('ingredients', '')
    ingredient_list = ingredients.split(',')
    matching_recipes = [r for r in recipes if any(i.strip().lower() in r['description'].lower() for i in ingredient_list)]
    return jsonify(matching_recipes)

if __name__ == '__main__':
    app.run(debug=True)
