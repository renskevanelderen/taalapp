#!/usr/bin/env python3
"""Ontwikkelserver voor de taalapp.

Waarom niet gewoon `python3 -m http.server`? Omdat die geen cache-headers
meestuurt. De browser mag dan zelf schatten hoe lang een bestand vers blijft,
en die schatting is bij ES-modules funest: je past speech.js aan, herlaadt,
en krijgt minutenlang de oude versie terug zonder enige melding. Dat kost
uren zoeken naar bugs die je al gerepareerd hebt.

Deze variant zegt bij elk bestand expliciet: niet bewaren.
"""

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        # De servicewerker mag vanaf de hele site scopen.
        self.send_header("Service-Worker-Allowed", "/")
        super().end_headers()

    # Een 304 "niet gewijzigd" stuurt de browser terug naar zijn eigen kopie,
    # en dat is precies wat we hier niet willen. Door de voorwaardelijke
    # kopregels weg te gooien blijft alleen een volledige 200 over.
    def send_head(self):
        for kop in ("If-Modified-Since", "If-None-Match"):
            while kop in self.headers:
                del self.headers[kop]
        return super().send_head()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
    root = Path(__file__).resolve().parent.parent
    handler = partial(NoCacheHandler, directory=str(root))
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        print(f"taalapp op http://localhost:{port}/ (zonder cache), map: {root}")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
