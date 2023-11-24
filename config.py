#Socket binding address
host = "0.0.0.0"
port = 8000

#File config
root_directory = "html"

#Routing

import canvas
routing = {
    "/ws": canvas.main
}

#Error page

error_html = """<html>
<head><title>{}</title></head>
<body>
<center><h1>{}</h1></center>
<hr><center>WSHost/1.0</center>
</body>
</html>"""

#Debug
debug = True
