// Modifica aquí los textos de las etapas de capacitación.
export interface Stage {
  title: string;
  description: string;
  note: string;
}

export const stages: Stage[] = [
  {
    title: 'Preparar la gestión',
    description: 'Revisa la información disponible del caso y el protocolo de atención antes de iniciar el contacto.',
    note: 'Confirma que cuentas con información actualizada y conoce las opciones autorizadas por la empresa.',
  },
  {
    title: 'Iniciar el contacto',
    description: 'Preséntate y realiza la validación de identidad siguiendo el protocolo definido por la empresa.',
    note: 'Protege la información del cliente. Valida la identidad antes de comunicar datos de la obligación.',
  },
  {
    title: 'Escuchar y comprender',
    description: 'Explica el motivo del contacto con claridad y escucha la situación que expresa el cliente.',
    note: 'Mantén un trato respetuoso, evita suposiciones y registra la información relevante.',
  },
  {
    title: 'Explorar alternativas',
    description: 'Revisa con el cliente las alternativas disponibles dentro de las condiciones autorizadas por la empresa.',
    note: 'No ofrezcas condiciones que no estén autorizadas. Confirma que el cliente comprende la alternativa.',
  },
  {
    title: 'Registrar y dar seguimiento',
    description: 'Resume el resultado del contacto y registra lo conversado según el procedimiento interno.',
    note: 'Si existe un acuerdo, confirma sus condiciones y el siguiente paso de seguimiento.',
  },
];
