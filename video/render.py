import base64, sys, os
from playwright.sync_api import sync_playwright
V = os.path.dirname(os.path.abspath(__file__))
FPS, T = 30, 10
solo = [float(x) for x in sys.argv[1:]]  # tiempos sueltos para probar; sin argumentos, el video entero
os.makedirs(f"{V}/cuadros", exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    pg.goto(f"file://{V}/planeta.html"); pg.wait_for_timeout(300)
    tiempos = solo or [i / FPS for i in range(FPS * T)]
    for i, t in enumerate(tiempos):
        datos = pg.evaluate(f"(dibujar({t}), document.getElementById('c').toDataURL('image/jpeg', 0.96))")
        nombre = f"prueba_{t:.2f}.jpg" if solo else f"cuadros/f{i:04d}.jpg"
        open(f"{V}/{nombre}", "wb").write(base64.b64decode(datos.split(",", 1)[1]))
    b.close()
print("listo", len(tiempos))
