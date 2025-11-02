import { success } from "./toast";

export const translations = {
  en: {
    home: {
      title: 'Home',
    },
    config: {
      title: 'Settings',
      alias: {
        label: 'Alias',
        placeholder: 'Type your alias',
      },
    },
    alarms: {
      title: 'Alarms',
      button: 'Create alarm',
      active: {
        exists: 'Active alarm',
        dontExists: 'There are no active alarms',
      },
      alarm: {
        duration: 'Duration',
        list: 'List',
      },
      create: {
        title: 'Create alarm',
        fields: {
          title: {
            label: 'Title',
            placeholder: 'Ex: Coffee alarm',
          },
          duration: {
            label: 'Duration (minutes)',
            placeholder: 'Ex: 5',
          },
          list: {
            label: 'Items list',
            placeholder: 'Ex: Keys',
          },
        },
        success: {
          created: 'Alarm created successfully!',
          updated: 'Alarm updated successfully!',
          title: 'Success',
        },
      },
      edit: {
        title: 'Edit alarm',
      },
      delete: {
        title: 'Delete alarm',
        question: 'Are you sure you want to delete this alarm?',
        ok: 'Yes, I am',
        cancel: 'Cancel',
      },
    },
    notification: {
      success: {
        title: 'You are not a Colguetti',
        body: "Wow, I can't believe it...",
      },
      fail: {
        title: 'Your are a Colguetti',
        body: 'Missed items:',
      },
    },
    actions: {
      save: 'Save',
      clear: 'Clear',
    },
    errors: {
      requiredFields: {
        title: 'Title is required',
        duration: 'Duration is required',
      },
      invalidFields: {
        duration: 'Duration must be a valid number',
        list: {
          unique: 'List items must be unique',
          valid: 'Invalid item',
        },
      }
    }
  },
  es: {
    home: {
      title: 'Inicio',
    },
    config: {
      title: 'Configuración',
      alias: {
        label: 'Alias',
        placeholder: 'Ingresa tu alias',
      }
    },
    alarms: {
      title: 'Alarmas',
      button: 'Agregar alarma',
      active: {
        exists: 'Alarma activa',
        dontExists: 'No hay alarmas activas',
      },
      alarm: {
        duration: 'Duración',
        list: 'Lista',
      },
      create: {
        title: 'Crear alarma',
        fields: {
          title: {
            label: 'Título',
            placeholder: 'Ej: Alarma para el café',
          },
          duration: {
            label: 'Duración (minutos)',
            placeholder: 'Ej: 5',
          },
          list: {
            label: 'Lista',
            placeholder: 'Ej: Llaves',
          },
        },
        success: {
          created: 'Alarma creada exitosamente!',
          updated: 'Alarma actualizada exitosamente!',
          title: 'Éxito',
        },
      },
      edit: {
        title: 'Editar alarma',
      },
      delete: {
        title: 'Eliminar alarma',
        question: '¿Seguro que querés eliminar esta alarma?',
        ok: 'Si, estoy seguro',
        cancel: 'Cancelar',
      },
    },
    notification: {
      success: {
        title: 'You are not a Colguetti',
        body: "Wow, I can't believe it...",
      },
      fail: {
        title: 'Your are a Colguetti',
        body: 'Missed items:',
      },
    },
    actions: {
      save: 'Guardar',
      clear: 'Borrar',
    },
    errors: {
      requiredFields: {
        title: 'El título es obligatorio',
        duration: 'La duración es obligatoria',
      },
      invalidFields: {
        duration: 'La duración debe ser un número válido',
        list: {
          unique: 'Los ítems de la lista deben ser únicos',
          valid: 'Ítem inválido',
        },
      }
    }
  },
};
