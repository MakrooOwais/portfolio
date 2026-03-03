import yaml
from jinja2 import Environment, FileSystemLoader
import json

def build():
    with open('data.yaml', 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)
    
    env = Environment(loader=FileSystemLoader('.'))
    env.filters['tojson'] = json.dumps
    
    template = env.get_template('template.html')
    rendered_html = template.render(**data)
    
    with open('index.html', 'w', encoding='utf-8') as file:
        file.write(rendered_html)
        
    print("Successfully built index.html from data.yaml")

if __name__ == '__main__':
    build()
