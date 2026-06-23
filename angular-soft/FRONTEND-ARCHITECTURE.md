# SEPH.PRINCIPAL Frontend Architecture

Frontend administrativo enterprise basado en Angular 21, Standalone Components, Signals, RxJS y TailwindCSS.

## Arquitectura recomendada

La arquitectura elegida es Clean Architecture Frontend + Feature-Based Architecture + Domain Driven Frontend.

Se eligió porque permite separar seguridad, contratos, estado, infraestructura HTTP y pantallas de negocio sin acoplar la UI a un backend específico. La app puede ejecutarse con mocks locales y luego conectarse a .NET 9 cambiando una bandera de configuración.

## Capas

```text
src/app/
  core/
    auth/
      domain/             Modelos de autenticación y sesión
      application/        Facade de estado con Signals
      infrastructure/     Adaptadores HTTP o mock
    config/               Configuración de API
    http/                 Interceptors y device id
    layout/               Shell administrativo
    security/             Guards de rutas
  features/
    auth/login/           Login standalone
    dashboard/            Dashboard administrativo
    iam/users/            Gestión de usuarios
  shared/
    models/               Contratos comunes
    ui/                   Componentes reutilizables
```

## Principios aplicados

- Standalone Components y lazy loading por feature.
- Signals para estado local de sesión y permisos.
- RxJS para flujos asíncronos e integración HTTP.
- Guards para proteger rutas autenticadas.
- Interceptors para JWT, refresh token y manejo centralizado de errores.
- DTOs tipados alineados al contrato `ResponseWrapper<T>`.
- TailwindCSS con diseño sobrio de dashboard empresarial.
- Smart components para features y UI components reutilizables para elementos comunes.

## Ejecutar sin backend

El proyecto está configurado para ejecutarse sin API:

```bash
npm install
npm start
```

Abre:

```text
http://localhost:4200
```

Credenciales de prueba:

```text
Correo: admin@seph.local
Contraseña: Admin123456!
```

La contraseña solo pasa las validaciones del formulario; en modo mock no se consulta ningún backend.

## Conectar a backend real

Edita:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

Cambia:

```ts
useMockApi: false
```

Y ajusta:

```ts
apiBaseUrl: 'https://localhost:7001/api/v1'
```

La app empezará a usar los endpoints reales:

- `POST /Auth/login`
- `POST /Auth/refresh-token`
- `POST /Auth/logout`
- `GET /Users/me`
- `GET /Dashboard/summary`

## Verificación local recomendada

```bash
npm run build
```

También puedes validar templates y TypeScript con:

```bash
./node_modules/.bin/tsc -p tsconfig.app.json --noEmit
./node_modules/.bin/ngc -p tsconfig.app.json
```
