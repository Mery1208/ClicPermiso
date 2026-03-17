import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definición de tipos
export interface DiaSolicitado {
  id: string; // id generado localmente
  DiaSolicitado: string;
  telefono: string;
  jornada: string;
  turno: string;
  horas_afectadas: number;
  dias_solicitados: number;
  estado: string;
  created_at: string;
  userId?: string; // Para vincularlo al usuario
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  dni: string;
  relacion: string;
  anos_servicio: number | null;
  hace_sustitucion: boolean;
}

interface DataState {
  solicitudes: DiaSolicitado[];
  profiles: Profile[];
  addSolicitud: (solicitud: Omit<DiaSolicitado, 'id' | 'created_at' | 'estado'>) => void;
  updateProfile: (profile: Profile) => void;
  getProfile: (id: string) => Profile | undefined;
}

// Para generar IDs simples
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      solicitudes: [],
      profiles: [],
      addSolicitud: (solicitud) => set((state) => ({
        solicitudes: [
          ...state.solicitudes,
          {
            ...solicitud,
            id: generateId(),
            estado: 'Pendiente', // Por defecto
            created_at: new Date().toISOString()
          }
        ]
      })),
      updateProfile: (profileData) => set((state) => {
        const index = state.profiles.findIndex(p => p.id === profileData.id);
        if (index >= 0) {
          const newProfiles = [...state.profiles];
          newProfiles[index] = profileData;
          return { profiles: newProfiles };
        } else {
          return { profiles: [...state.profiles, profileData] };
        }
      }),
      getProfile: (id) => {
        return get().profiles.find(p => p.id === id);
      }
    }),
    {
      name: 'clicpermiso-data-storage' // nombre del item en localStorage
    }
  )
);
