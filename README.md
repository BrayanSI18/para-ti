# 🌻 Flores Amarillas - 21 de Septiembre 💛

Una página web romántica, interactiva y deslumbrante diseñada para celebrar el **21 de Septiembre** y regalar flores amarillas virtuales a esa persona especial.

---

## ✨ Características y Detalles Mágicos

- 🌻 **Gran Girasol Interactivo**: Con animación orgánica, destellos de luz al tocar y frases de cariño.
- 💌 **Carta Virtual 3D**: Sobre interactivo que se abre y muestra una dedicatoria emotiva y personalizable.
- 🍃 **Lluvia de Pétalos Dorados**: Partículas flotantes que caen suavemente por la pantalla en tiempo real.
- 🎴 **Tarjetas Mágicas de Amor**: 4 tarjetas 3D que se giran al tocar para revelar motivos especiales.
- 🌸 **Jardín Mágico**: Toca la pantalla para plantar girasoles y ver cumplidos florecer con sonido armónico.
- 🎵 **Música Romántica Ambiental**: Sintetizador con Web Audio API que reproduce una suave melodía.
- ✍️ **Personalizador en Vivo**: Modifica el nombre de la persona, firma y mensaje, y genera un enlace listo para enviar.

---

## 🚀 Cómo Subir tu Página a GitHub y Activar GitHub Pages (Paso a Paso)

Puedes subir tu proyecto a GitHub de dos maneras: **Método 1 (Fácil desde la Web)** o **Método 2 (Con la Terminal Git)**.

---

### 🌟 MÉTODO 1: Desde la Web de GitHub (El más rápido sin instalar nada)

1. **Entra a GitHub**:
   - Inicia sesión en tu cuenta en [github.com](https://github.com).
2. **Crea un nuevo repositorio**:
   - Haz clic en el botón verde **"New"** o el icono `+` (arriba a la derecha) -> **New repository**.
   - En **Repository name**, pon: `flores-amarillas` (o el nombre que quieras).
   - Asegúrate de marcarlo como **Public** (Público).
   - Haz clic en **Create repository**.
3. **Sube los archivos**:
   - En la pantalla que aparece, haz clic en el enlace azul **"uploading an existing file"**.
   - Arrastra y suelta los archivos de esta carpeta:
     - `index.html`
     - `style.css`
     - `script.js`
     - `README.md`
   - Haz clic abajo en el botón verde **"Commit changes"**.
4. **Activa GitHub Pages**:
   - En la parte superior de tu repositorio, ve a **Settings** (Configuración ⚙️).
   - En el menú izquierdo, busca y haz clic en **Pages**.
   - En **Branch**, selecciona `main` (o `master`) y la carpeta `/(root)`.
   - Haz clic en **Save** (Guardar).
5. **¡Listo!**:
   - Espera 1 o 2 minutos. En esa misma pestaña de *Pages*, te aparecerá el enlace verde:
   - `https://tu-usuario.github.io/flores-amarillas/`

---

### 💻 MÉTODO 2: Desde la Terminal con Git

Abre tu terminal (PowerShell o Git Bash) en esta carpeta y ejecuta los siguientes comandos:

```bash
# 1. Iniciar el repositorio local
git init

# 2. Agregar todos los archivos
git add .

# 3. Guardar el commit inicial
git commit -m "Flores Amarillas 21 de Septiembre 💛"

# 4. Cambiar a rama principal
git branch -M main

# 5. Conectar con tu repositorio en GitHub (reemplaza TU-USUARIO y REPOSITORIO)
git remote add origin https://github.com/TU-USUARIO/flores-amarillas.git

# 6. Subir los archivos
git push -u origin main
```

Luego ve a **Settings** > **Pages** en tu repositorio de GitHub, selecciona la rama `main` y guarda para obtener tu enlace público.

---

## 🎁 Cómo Enviar un Enlace Personalizado

Puedes personalizar el enlace directamente añadiendo los parámetros al final de la URL:

```text
https://tu-usuario.github.io/flores-amarillas/?to=Sofia&from=Brayan
```

O usa el botón **"Personalizar"** en la esquina superior izquierda de la página para escribir tu mensaje y hacer clic en **"Copiar Link Personalizado"**.
