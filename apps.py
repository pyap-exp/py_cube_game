from db import app
from apps.page.simple_page import simple_page

app.register_blueprint(simple_page)


if __name__ == "__main__":
 
	app.run()
