export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";


export interface IWorkout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: DifficultyLevel;
  duration: number; // minutes
  caloriesBurned: number;
  sets: number;
  reps: string; 
  rating: number;
  description: string;
  instructions: string[];
}