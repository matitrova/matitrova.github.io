# Video de la portada

`planeta.html` dibuja el planeta holográfico cuadro por cuadro (`dibujar(t)`), y
todo es periódico: el cuadro de t = 10 s es igual al de t = 0, así el video se
repite sin corte.

Para volver a generarlo (con Playwright de Python):

```bash
python video/render.py            # 300 cuadros en video/cuadros/
ffmpeg -framerate 30 -i video/cuadros/f%04d.jpg -c:v libx264 -preset slow -crf 23 \
  -pix_fmt yuv420p -movflags +faststart -an public/media/hero.mp4
```

`python video/render.py 0 3.5` genera solo esos cuadros sueltos, para probar.
