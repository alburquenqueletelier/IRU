# E-commerce para IRU
---

E-commerce para I Roll You - Cinnamon, un emprendimiento de venta especializado en Cinnamon Rolls. 
Contiene herramietas para almacenar la información de los insumos, generación de productos, combos y promociones, 
administración de imagenes de portada, administración de usuarios, carrito de compras. 
Actualmente está en etapa alfa, solo desarollo.
Pueden visitar instragram de IRU [aquí](https://www.instagram.com/irollyou_cinnamon/)

## Requirements

La aplicación utiliza Python con Django para el backend y React para el frontend.
Incluye un archivo fixures para precargar datos a la db pero debes llenar todas las tablas para poder usar las funcionalidades.
Clona o has fork a este repo. Debes tener instalado Pipenv, Node y algun database engine (está configurado con Postgres)

### Backend Install
1. Instala los paquetes desde la carpeta principal del proyecto: `$ pipenv install`
2. Crea el archivo .env para tus variables de entorno
3. Instala el motor de base de datos que quieras utilizar y agrega la variable DATABASE_URL a tu archivo ambiente. No olvides crear la db. 
EJ:
```
#.env
DATABASE_URL=postgres://username:password@localhost:5432/-nombre-db
```
4. Abre el archivo settings.py ubicado en la carpeta backend (si no está tendrás que crearlo, puedes copiar la configuración inicial desde la web) y configura tu base de datos con las APP. Agrega o edita las variables detalladas en el ejemplo.
EJ:
```python
# settings.py
ALLOWED_HOSTS = ['127.0.0.1']

# White listing the localhost:3000 port
# for React
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
]

INSTALLED_APPS = [
    #...
    'api',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt' # JWT authentication. Puedes usar otra si lo deseas, de momento no está implementada
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'iru', # cambia por el nombre de tu db
        'USER': 'baal', # cambia por tu nombre de usuario definido en el database engine
        'PASSWORD': '123456789',  # clave secreta para el usuario definido antes
        'HOST': 'localhost',
        'PORT': '',
    }
}

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ],
    # 'DEFAULT_AUTHENTICATION_CLASSES': [
    #     'rest_framework_simplejwt.authentication.JWTAuthentication',
    # ]
}
```
5. En la terminal corre los siguientes comandos:
```
$ python manage.py makemigrations
.
.
.
$ python manage.py migrate
```
6. Si todo salió correcto ejecuta `$ python manage.py runserver`, dirigete al buscador e ingresa http://localhost.com:8000/admin o http://127.0.0.1:8000/admin y debieses poder ver la pagina de administrador de Django. Recuerda generar un super usuario escribiendo en la consola `$ python manage.py createsuperuser`

### Frontend Install
1. Desde la terminal dirigete a la carpeta frontend (`$ cd frontend`) y ejecuta `npm install`
2. Ejecuta npm run start para abrir el servidor de desarrollo. Recuerda tener otra consola abierta con el servidor de desarrollo de Django para que puedan funcionar la aplicación correctamente.

---

### Contacto y Contribuciones
Cualquier duda me la puedes hacer llegar, o si gustas de brindarme algún consejo también es bien recibido:
- alburquenque.letelier@gmail.com
- +56 9 79577547

Si quieres contribuir sientete libre de realizar un pull request o decirme directamente como podría mejorar el código, te lo agradecería de corazón ☺
