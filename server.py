import http.server
import socketserver
import os

PORT = 8080

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Get the absolute path of the requested file
        path = self.translate_path(self.path)
        
        # If the path corresponds to a directory, check if index.html exists
        if os.path.isdir(path):
            if os.path.exists(os.path.join(path, "index.html")):
                super().do_GET()
                return
        
        # If file exists, serve it normally
        if os.path.exists(path):
            super().do_GET()
        else:
            # If file missing, serve 404.html with 404 status code
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            try:
                with open('404.html', 'rb') as f:
                    self.wfile.write(f.read())
            except Exception as e:
                self.wfile.write(b"404 Not Found (and 404.html is missing!)")

print(f"Starting server at http://localhost:{PORT}")
print("Custom 404 handler enabled.")

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
