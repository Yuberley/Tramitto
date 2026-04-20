# 📄 PRD: Tramitto — Red de Mandados y Trámites Bajo Demanda

## 1. Meta-Información
* **Nombre:** Tramitto
* **Objetivo:** Lanzamiento de MVP validable en Cumaral, Meta (Colombia). Ciudad vecina de referencia: Villavicencio.
* **Población objetivo:** ~25.500 habitantes (~16.600 urbanos).
* **Plataformas:** 
  * Cliente: WhatsApp (Conversacional).
  * Helper: Web App (Gestión) + WhatsApp (Notificaciones).
  * Admin: Web App (Panel de Control).

## 2. Visión y Resumen Ejecutivo
Convertirnos en la infraestructura digital de servicios personales bajo demanda en Colombia. La plataforma conecta demanda (usuarios que necesitan delegar filas, trámites físicos o gestiones digitales) con oferta (Helpers verificados locales o nacionales). El sistema opera con WhatsApp como canal principal para los clientes, eliminando la fricción de descargar apps, y usa una Web App robusta para los ejecutores.

## 3. Problema y Solución
* **Problema:** Pérdida de tiempo en actividades de bajo valor (trámites burocráticos, filas, gestiones digitales).
* **Solución:** Plataforma asíncrona vía WhatsApp que captura necesidades, las cotiza dinámicamente y las asigna a una red de ejecutores validados mediante un sistema de subasta a ciegas y pagos retenidos (Escrow).

## 4. Arquetipos de Usuario
1. **El Cliente:** Valora su tiempo. Pide favores por WhatsApp. No quiere descargar apps.
2. **El Helper:** Independiente buscando ingresos. Usa una Web App para ver tareas y subir evidencias. (Incluye población nacional y extranjera con permisos legales).
3. **El Admin:** Monitorea la operación, ajusta parámetros del sistema (GMV, tarifas, alcances), resuelve disputas manuales y valida casos borde de KYC.

## 5. Casos de Uso Core (Scope del MVP)
* **Trámites Físicos:** EPS, notarías, bancos, reclamación de medicamentos.
* **Compras/Mandados:** Farmacia, mercado ligero, entregas locales.
* **Filas/Turnos:** Tiempos de espera delegados.
* **Gestiones Digitales:** Agendamientos, redacción de documentos, certificados en línea.
  * **Restricción MVP:** Solo gestiones que NO requieran credenciales de acceso del Cliente. Tareas que impliquen iniciar sesión en plataformas del Cliente se difieren a post-MVP.

## 6. Reglas de Negocio y Configuración (Motor de Parámetros)
El MVP requiere un alto nivel de parametrización desde el panel de administración para ajustar el modelo de negocio en caliente:

### 6.1 Monetización
* **Modelo:** Comisión al Helper. El cliente ve el precio limpio sin recargos de plataforma.
* **Comisión base:** 20% sobre el valor del servicio (configurable desde Admin).
* **Tarifa mínima de plataforma:** Configurable desde Admin. Si el 20% resulta menor que la tarifa mínima, se cobra la tarifa mínima.
* **Costo de gateway de pagos:** Absorbido por la plataforma. NO se traslada al Helper ni al Cliente.
* **Ejemplo:** Tarea de $20.000 COP → Helper recibe $16.000, Plataforma retiene $4.000 (de los cuales ~$700 son costo de gateway).

### 6.2 Tarifa y Precio
* **Estimado de plataforma:** Se muestra al Cliente como rango (Ej: "$12.000 - $18.000") basado en: categoría + distancia + complejidad estimada + franja horaria (surge).
* **Precio real:** Lo define el Helper al ofertar en la subasta. El estimado de la plataforma se le muestra como sugerido.
* **Aprendizaje continuo:** El motor de estimación se retroalimenta con cada transacción completada para mejorar la precisión del rango con el tiempo.
* **Costo de productos (Compras/Mandados):** Se muestra como línea separada e informativa. NO se incluye en el cálculo de comisión ni en la tarifa de servicio. Es una referencia para el Cliente.

### 6.3 Límites Financieros
* Monto máximo transaccional permitido por tarea (Ej: Tareas que impliquen compras no pueden superar los $200.000 COP). Configurable desde Admin.

### 6.4 Alcance de Asignación (Geofencing)
* *Tareas Físicas:* Radio de notificación configurable en kilómetros (`X` km a la redonda desde la ubicación del cliente).
* *Tareas Digitales:* Notificación abierta (Cualquier Helper a nivel nacional).

### 6.5 Tarifas Dinámicas (Surge Pricing)
* Capacidad de configurar zonas/franjas horarias con un incremento porcentual (`+Y%`) sobre la tarifa base para incentivar la oferta en horas de alta demanda o dificultad. Configurable desde Admin.

### 6.6 Inactividad del Helper
* Tiempo máximo (`Z` horas) de inactividad antes de disparar una notificación de reenganche por WhatsApp. Configurable desde Admin.

### 6.7 Límite de Tareas Concurrentes por Helper
Configurable desde Admin por cada categoría. Valores por defecto:

| Categoría | Límite por defecto | Razón |
|---|---|---|
| Trámites Físicos | 1 simultánea | Requiere presencia física |
| Compras/Mandados | 2 simultáneas | Puede optimizar ruta en misma zona |
| Filas/Turnos | 1 simultánea | Requiere presencia continua |
| Gestiones Digitales | 3 simultáneas | No requiere desplazamiento |

* Si el Helper está en nivel de desempeño "En riesgo" (🟡), su límite se reduce a 1 en todas las categorías.

## 7. Flujo de Subasta a Ciegas
* Múltiples Helpers pueden ofertar su precio para una misma tarea.
* Cada Helper oferta SIN ver lo que ofertaron los demás (subasta a ciegas).
* El Cliente ve: precio ofertado + calificación del Helper en la categoría de la tarea.
* El Cliente elige al Helper que prefiera (no necesariamente el más barato).
* **Timeout de la subasta:** 1 minuto por defecto (configurable desde Admin).
* Si ningún Helper oferta dentro del timeout → la tarea pasa a estado EXPIRADA y se notifica al Cliente.

### 7.1 Distribución de Tareas (Matching)
* **Modelo:** Broadcast total. TODOS los Helpers elegibles (que cumplen geofencing + categoría + capacidad concurrente + no suspendidos) ven la tarea simultáneamente en su feed.
* No hay distribución escalonada ni priorización por Health Score para la visibilidad de tareas.
* Un Helper que ve una tarea y NO oferta NO recibe ningún impacto negativo en su desempeño. Solo se penalizan abandonos.

## 8. Medios de Pago y Payouts

### 8.1 Pago del Cliente (Checkout)
* **Métodos aceptados en MVP:** Tarjeta de crédito/débito, PSE (transferencia bancaria) y Nequi.
* **Solo pago digital.** No se acepta efectivo (Efecty/Baloto) en el MVP.
* **Implementación:** Diseño abstraído con Patrón Adapter (`IPaymentGateway`). El proveedor de gateway aún no está definido, pero la arquitectura permite implementar cualquiera (ePayco, PayU, Wompi) sin afectar la lógica de negocio.
* **Link de pago:** Se genera un link de pago único por tarea que se envía al Cliente por WhatsApp tras aceptar una oferta de Helper.

### 8.2 Payout al Helper (Retiro de Fondos)
* **Métodos de retiro en MVP:** Transferencia bancaria y Nequi.
* **Monto mínimo de retiro:** Configurable desde el panel de Admin.
* **Frecuencia de retiro:** Semanal por defecto. Configurable desde el panel de Admin.
* **Costo de transferencia:** Se descuenta al Helper en cada retiro.
* **Retención tributaria:** Se difiere a post-MVP. No se aplica retención en la fuente automática en el MVP.

## 9. WhatsApp: Estrategia de Mensajería

### 9.1 Regla de las 24 Horas
La API oficial de WhatsApp Cloud permite mensajes libres solo dentro de las 24 horas posteriores al último mensaje del usuario. Fuera de esa ventana, SOLO se pueden enviar Template Messages pre-aprobados por Meta.

### 9.2 Template Messages Requeridos para el MVP
Estos templates deben ser enviados a Meta para pre-aprobación ANTES del lanzamiento (la aprobación puede tardar entre 24h y 7 días):

| # | Nombre del Template | Contenido | Trigger |
|---|---|---|---|
| T1 | `task_status_update` | "Tu tarea #{id} cambió a estado: {estado}. Detalle: {link}" | Transición de estado fuera de ventana 24h |
| T2 | `new_tasks_available` | "Tienes nuevas tareas disponibles en tu zona. Ingresa a verlas: {link}" | Re-captación de Helper inactivo (> Z horas) |
| T3 | `dispute_resolved` | "Tu disputa #{id} fue resuelta. Resultado: {resultado}. Detalle: {link}" | Cierre de disputa por Admin |
| T4 | `payment_released` | "Tu pago de ${monto} fue liberado a tu billetera. Saldo disponible: ${saldo}" | Liberación de pago (Escrow → Disponible) |
| T5 | `rate_your_task` | "¿Cómo fue tu experiencia? Califica tu tarea #{id}: {link}" | Recordatorio de calificación post-completado |
| T6 | `payout_confirmed` | "Tu retiro de ${monto} fue procesado exitosamente a {metodo_retiro}" | Confirmación de payout al Helper |

### 9.3 Fallback
Si un template no es aprobado por Meta, no existe fallback alternativo en el MVP. Se debe iterar el contenido del template hasta lograr la aprobación.

## 10. Ciclo de Vida de la Tarea (State Machine)

### 10.1 Diagrama de Estados
```
SOLICITADA → COTIZADA → EN_SUBASTA → ACEPTADA → EN_PROGRESO → EVIDENCIA_SUBIDA → COMPLETADA → CERRADA
                            ↓              ↓            ↓                ↓                ↓
                         EXPIRADA   CANCELADA_CLIENTE  ABANDONADA    EN_DISPUTA       EN_DISPUTA
                                                          ↓
                                                      EN_SUBASTA (reasignación)
```

### 10.2 Definición de Estados
| Estado | Descripción | Transiciones válidas |
|---|---|---|
| SOLICITADA | Cliente envía solicitud por WhatsApp (solo texto + ubicación) | → COTIZADA |
| COTIZADA | Plataforma genera rango estimado y publica la tarea | → EN_SUBASTA |
| EN_SUBASTA | Helpers ofertan a ciegas durante el timeout configurable (default: 30 min) | → ACEPTADA · EXPIRADA |
| ACEPTADA | Cliente elige un Helper y realiza el pago (Escrow) | → EN_PROGRESO · CANCELADA_CLIENTE |
| EN_PROGRESO | Helper está ejecutando la tarea activamente | → EVIDENCIA_SUBIDA · ABANDONADA_HELPER |
| EVIDENCIA_SUBIDA | Helper sube pruebas de completado (fotos/documentos) | → COMPLETADA · EN_DISPUTA |
| COMPLETADA | Cliente confirma entrega O se auto-libera por timeout (configurable desde Admin) | → CERRADA · EN_DISPUTA |
| CERRADA | Pago liberado al Helper + ambas partes califican. Estado terminal | — |
| EXPIRADA | Ningún Helper ofertó en el timeout de subasta. Estado terminal | — |
| CANCELADA_CLIENTE | Cliente cancela antes de EN_PROGRESO. Reembolso 100%. Estado terminal | — |
| ABANDONADA_HELPER | Helper abandona. Penalización de desempeño. Tarea vuelve a EN_SUBASTA | → EN_SUBASTA |
| EN_DISPUTA | Cualquier parte reporta un problema | → RESUELTA |
| RESUELTA | Admin cierra la disputa según rúbrica de resolución | → CERRADA |

### 10.3 Reglas de Transición
* **Cancelación del cliente:** Permitida en cualquier estado ANTES de EN_PROGRESO. Reembolso 100%.
* **Cancelación en EN_PROGRESO:** No permitida directamente. El cliente debe abrir una disputa.
* **Auto-liberación de pago:** Si el Cliente no confirma entrega en `X` minutos (configurable desde Admin) después de EVIDENCIA_SUBIDA, el pago se libera automáticamente al Helper.
* **Reasignación:** Si un Helper abandona, la tarea vuelve a EN_SUBASTA para que nuevos Helpers puedan ofertar.

## 11. Política de Cancelación, Reembolsos y Disputas

### 11.1 Tabla de Cancelaciones
| Escenario | Resultado financiero | Impacto en desempeño |
|---|---|---|
| Cliente cancela antes de EN_PROGRESO | Reembolso 100% | Ninguno |
| Cliente cancela en EN_PROGRESO | Entra EN_DISPUTA. Admin resuelve según rúbrica | Depende de resolución |
| Helper abandona antes de EN_PROGRESO | Tarea vuelve a EN_SUBASTA | Penalización al indicador de desempeño (-5 pts) |
| Helper abandona EN_PROGRESO (sin compras) | Tarea vuelve a EN_SUBASTA. Reembolso 100% si no se reasigna | Penalización severa (-15 pts) |
| Helper abandona EN_PROGRESO (con compras hechas) | Costo de productos lo absorbe el Helper. Tarea vuelve a EN_SUBASTA | Penalización severa (-15 pts) |

### 11.2 Rúbrica de Resolución de Disputas (configurable desde Admin)
| Caso | % Reembolso Cliente | % Pago Helper |
|---|---|---|
| Tarea no realizada | 100% | 0% |
| Tarea parcialmente realizada | 50-70% | 30-50% |
| Tarea realizada con defectos | 20-40% | 60-80% |
| Tarea completada, cliente insatisfecho sin justificación | 0% | 100% |

## 12. Sistema de Calificaciones (Bidireccional por Categoría)

### 12.1 Calificación al Helper (por parte del Cliente)
Cada dimensión se califica de 1-5 estrellas. El score público del Helper POR CATEGORÍA es el promedio ponderado de sus dimensiones.

| Categoría | Dimensiones |
|---|---|
| **Trámites Físicos** | Puntualidad · Resultado obtenido · Comunicación durante la tarea |
| **Compras/Mandados** | Precisión del pedido · Estado de los productos · Tiempo de entrega |
| **Filas/Turnos** | Puntualidad · Comunicación de avances · Tiempo total |
| **Gestiones Digitales** | Calidad del trabajo · Cumplimiento de instrucciones · Tiempo de entrega |

* Un Helper puede tener 4.8★ en "Compras" pero 3.2★ en "Digital". Este score por categoría es visible para el Cliente durante la subasta.

### 12.2 Calificación al Cliente (por parte del Helper)
| Dimensión | Qué mide |
|---|---|
| Claridad de instrucciones | ¿La solicitud estaba bien descrita? |
| Responsividad | ¿Respondió rápido a mensajes durante la tarea? |
| Razonabilidad | ¿Las expectativas eran realistas para el precio? |

* El score del Cliente es visible para los Helpers en la subasta. Un Cliente con score bajo recibe naturalmente menos ofertas (autorregulación del mercado).

## 13. Sistema de Desempeño del Helper (Health Score)

### 13.1 Fórmula
```
HEALTH_SCORE = (Rating Promedio × W1) + (Tasa Completado × W2) + (Tasa Aceptación × W3) + (Antigüedad × W4)
```
Donde W1 + W2 + W3 + W4 = 1.0 (100%). Los pesos son configurables desde el panel de Admin.

**Valores por defecto:**

| Componente | Qué mide | Peso por defecto |
|---|---|---|
| Rating Promedio | Promedio ponderado de todas las calificaciones recibidas | W1 = 0.40 (40%) |
| Tasa de Completado | % de tareas aceptadas que llegaron a COMPLETADA sin abandono | W2 = 0.30 (30%) |
| Tasa de Aceptación | % de ofertas realizadas vs tareas disponibles en su radio | W3 = 0.20 (20%) |
| Antigüedad | Tiempo activo en la plataforma (con tope configurable) | W4 = 0.10 (10%) |

### 13.2 Niveles y Consecuencias
| Nivel | Health Score | Beneficio / Penalización |
|---|---|---|
| 🟢 Excelente | 90 - 100 | Ve tareas antes que otros (prioridad en feed), badge visible al Cliente |
| 🔵 Bueno | 70 - 89 | Operación normal, sin restricciones |
| 🟡 En riesgo | 50 - 69 | Notificación de advertencia por WhatsApp. Tareas simultáneas reducidas a 1 por categoría |
| 🔴 Crítico | 30 - 49 | Suspensión temporal (días configurables desde Admin). Solo puede ver tareas, no ofertar |
| ⚫ Desactivado | < 30 | Desactivación de cuenta. Requiere contacto con soporte para reactivación |

### 13.3 Penalizaciones por Evento
| Evento | Impacto en Health Score |
|---|---|
| Abandono antes de EN_PROGRESO | -5 puntos |
| Abandono en EN_PROGRESO | -15 puntos |
| Disputa resuelta en contra del Helper | -10 puntos |
| Calificación ≤ 2 estrellas recibida | -3 puntos |

* Los umbrales de los niveles y los puntos de penalización son configurables desde el panel de Admin.

## 14. Decisiones Arquitectónicas Core
1. **WhatsApp API:** Uso de la API Oficial de WhatsApp Cloud (Meta) para control total del flujo conversacional.
2. **Ingesta de solicitudes:** Solo texto + ubicación GPS para el MVP. Si el cliente envía audio, el bot responde pidiendo que escriba su solicitud en texto.
3. **Pagos (Agnóstico):** Diseño de pagos con **bajo acoplamiento (Patrón Adapter)**. El core interactúa con una interfaz genérica, permitiendo cambiar de proveedor (ePayco, PayU, Wompi) sin afectar la lógica.
4. **Escrow (Ledger Interno):** El dinero entra a las cuentas de la plataforma y se refleja en una Billetera Virtual Interna para el Helper. Los fondos pasan de "Retenidos" a "Disponibles" al finalizar la tarea.
5. **Validación KYC Inclusiva (Truora):** Flujo dinámico de validación de antecedentes e identidad que soporta múltiples documentos (Cédula de Ciudadanía, Cédula de Extranjería, PPT, Pasaporte).

## 15. Requerimientos Funcionales (MVP)

### 15.1 Módulo del Cliente (WhatsApp Bot)
* **Ingesta:** Captura de solicitud vía texto y ubicación (GPS). Si se recibe audio, el bot solicita texto.
* **Cotización Estimada:** Presentación de rango de precio estimado basado en el motor de cálculo de la plataforma.
* **Subasta:** El Cliente recibe ofertas de Helpers (precio + calificación por categoría) y elige la que prefiera.
* **Checkout:** Generación de Link de Pago único (Escrow).
* **Tracking:** Alertas de cambio de estado en cada transición de la tarea.
* **Soporte/Disputas:** Botón de "Reportar Problema" que escala el chat de WhatsApp directamente a un agente humano (Admin) para resolución manual.
* **Cierre:** Recepción de evidencias, confirmación de entrega (o auto-liberación por timeout), calificación por dimensiones según categoría de la tarea.

### 15.2 Módulo del Helper (Web App + WhatsApp)
* **Onboarding Dinámico:** Selección de tipo de documento (CC, CE, PPT) que adapta las instrucciones de captura de fotos y conecta con la validación de Truora.
* **Tablero de Tareas (Feed):** Lista de tareas filtrada automáticamente por las reglas de alcance (X km para físicas, todas para digitales). Helpers con Health Score 🟢 Excelente ven las tareas con prioridad.
* **Oferta/Subasta:** El Helper ve la tarea con el rango estimado de la plataforma como sugerido y define su propio precio. Oferta a ciegas (no ve precios de otros Helpers).
* **Ejecución:** Botones de estado y subida de evidencia fotográfica/documental.
* **Billetera Interna:** Vista de saldo retenido, saldo disponible y botón de "Solicitar Retiro" (Payout).
* **Calificación al Cliente:** Al cerrar la tarea, el Helper califica al Cliente en: Claridad, Responsividad, Razonabilidad.
* **Notificaciones (WhatsApp):** Alertas proactivas de nuevas tareas rentables si el usuario supera el umbral de inactividad.

### 15.3 Módulo de Administración (Backoffice Web)
* **Dashboard Operativo:** Métricas (GMV, tareas activas, tasa de conversión, Health Score promedio de la red).
* **Motor de Reglas (Parámetros Configurables):** Interfaz para editar en caliente:
  * Comisión base (%) y tarifa mínima de plataforma.
  * Montos máximos transaccionales por tarea.
  * Kilómetros de radio de geofencing.
  * Porcentajes de tarifa dinámica (surge) por zonas/franjas horarias.
  * Timeout de subasta.
  * Timeout de auto-liberación de pago.
  * Tiempo de inactividad del Helper.
  * Límites de tareas concurrentes por categoría.
  * Pesos del Health Score (W1, W2, W3, W4) y umbrales de niveles.
  * Puntos de penalización por evento.
  * Días de suspensión para nivel Crítico.
  * Rúbrica de resolución de disputas (% por caso).
  * Monto mínimo de retiro (payout) para Helpers.
  * Frecuencia de retiro permitida para Helpers.
* **Mesa de Ayuda (Disputas):** Interfaz omnicanal para que el admin tome el control del chat de WhatsApp del cliente cuando este reporte un problema, con capacidad de forzar reembolsos o pagos según la rúbrica configurada.
* **Gestión KYC:** Revisión manual de documentos extranjeros o casos rechazados por el sistema automático.
* **Gestión de Helpers:** Vista de Health Score, historial de penalizaciones, suspensiones activas, y capacidad de reactivar cuentas desactivadas.

## 16. Aspectos Legales y de Riesgo
* **Exención de Responsabilidad (Waiver):** Aceptación explícita vía WhatsApp de que la plataforma es un intermediario tecnológico y no asume responsabilidad civil/penal por el resultado de trámites legales o gestiones digitales.

## 17. Métricas de Éxito / KPIs del MVP
Metas calibradas para Cumaral, Meta (~25.500 hab, ~16.600 urbanos). Periodo de validación: primeros 3 meses post-lanzamiento.

### 17.1 Métricas de Demanda (Cliente)
| KPI | Meta Mes 1 | Meta Mes 3 | Cómo se mide |
|---|---|---|---|
| Tareas solicitadas / semana | 15 - 25 | 50 - 80 | Conteo de tareas en estado ≥ SOLICITADA |
| Tasa de conversión (solicitada → pagada) | 25 - 35% | 40 - 50% | Tareas ACEPTADAS / Tareas SOLICITADAS |
| Ticket promedio (servicio) | $15.000 COP | $20.000 COP | Promedio del precio del Helper aceptado |
| NPS del Cliente | ≥ 20 | ≥ 35 | Encuesta post-tarea vía WhatsApp |
| Tasa de recompra (clientes que repiten) | 10 - 15% | 25 - 35% | Clientes con ≥ 2 tareas / Total clientes |

### 17.2 Métricas de Oferta (Helper)
| KPI | Meta Mes 1 | Meta Mes 3 | Cómo se mide |
|---|---|---|---|
| Helpers activos / semana | 8 - 12 | 15 - 25 | Helpers con ≥ 1 oferta en la semana |
| Tareas completadas por Helper / semana | 2 - 3 | 3 - 5 | Tareas CERRADAS / Helpers activos |
| Retención de Helpers (mes a mes) | 40 - 50% | 55 - 65% | Helpers activos mes N / Helpers activos mes N-1 |
| Health Score promedio de la red | ≥ 65 | ≥ 75 | Promedio de Health Score de Helpers activos |

### 17.3 Métricas de Negocio
| KPI | Meta Mes 1 | Meta Mes 3 | Cómo se mide |
|---|---|---|---|
| GMV mensual | ~$1.2M COP | ~$4M COP | Suma de todos los pagos procesados |
| Revenue neto (comisiones) | ~$240K COP | ~$800K COP | GMV × comisión efectiva promedio |
| Tasa de disputas | < 10% | < 5% | Tareas EN_DISPUTA / Tareas COMPLETADAS |
| Tiempo promedio subasta → aceptación | < 25 min | < 15 min | Tiempo entre EN_SUBASTA y ACEPTADA |
| Tasa de expiración de subastas | < 40% | < 20% | Tareas EXPIRADAS / Tareas EN_SUBASTA |

### 17.4 Criterio de Validación del MVP
El MVP se considera **validado** si al final del mes 3 se cumplen AL MENOS 4 de estos 5 indicadores:
1. ≥ 50 tareas solicitadas por semana.
2. Tasa de conversión ≥ 40%.
3. Tasa de recompra ≥ 25%.
4. Retención de Helpers ≥ 55%.
5. Tasa de disputas < 5%.
